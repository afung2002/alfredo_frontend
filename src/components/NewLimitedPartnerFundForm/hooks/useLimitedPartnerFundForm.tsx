import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFundLimitedPartnerMutation, useCreateInvitationMutation } from '@services/api/baseApi';

// Validation schemas
const selectExistingSchema = z.object({
  limitedPartner: z.object({
    email: z.string().email(),
    name: z.string().min(1),
    // you can add more fields if necessary
  }, {
    required_error: 'Limited partner is required'
  }),
  investedAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Invested amount must be a positive number',
  }),
});

const inviteNewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  website: z.string().optional(),
  fundAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Fund amount must be a positive number',
  }),
  description: z.string().optional(),
});

export type SelectLimitedPartnerFormData = z.infer<typeof selectExistingSchema>;
export type InviteLimitedPartnerFormData = z.infer<typeof inviteNewSchema>;

const useLimitedPartnerFundForm = (fundId: number | string | undefined, closeModal: () => void, openFeedbackModal: () => void) => {
  const [createLimitedPartner, { isLoading: creatingLP }] = useCreateFundLimitedPartnerMutation();
  const [createInvitation, { isLoading: invitingLP }] = useCreateInvitationMutation();

  const existingLpForm = useForm<SelectLimitedPartnerFormData>({
    resolver: zodResolver(selectExistingSchema),
    defaultValues: { 
      limitedPartner: undefined,
      investedAmount: '' 
    },
    mode: 'onChange',
  });

  const inviteLpForm = useForm<InviteLimitedPartnerFormData>({
    resolver: zodResolver(inviteNewSchema),
    defaultValues: { name: '', email: '', website: '', fundAmount: '', description: '' },
    mode: 'onChange',
  });

  // onSubmit for adding existing limited partner
  const onSubmitExisting = async (data: SelectLimitedPartnerFormData) => {
    if (!fundId) return;
    try {
      // await createLimitedPartner({
      //   limited_partner: data.limitedPartner,
      //   invested_amount: data.investedAmount,
      //   fund: Number(fundId),
      // }).unwrap();
      await createInvitation({
        fund: Number(fundId),
        invested_amount: data.investedAmount,
        email_address: data.limitedPartner.email,
        public_metadata: {
          name: data.limitedPartner.name,
          role: 'limited_partner',
        },
      }).unwrap();
      existingLpForm.reset();
      closeModal(); // Close modal after success
      openFeedbackModal();
    } catch (err) {
      console.error('Error adding existing LP:', err);
    }
  };

  // onSubmit for inviting new limited partner
  const onSubmitInvitation = async (data: InviteLimitedPartnerFormData) => {
    if (!fundId) return;
    try {
      await createInvitation({
        fund: Number(fundId),
        invested_amount: data.fundAmount,
        email_address: data.email,
        public_metadata: {
          name: data.name,
          role: 'limited_partner',
        },
      }).unwrap();
      inviteLpForm.reset();
      closeModal(); // Close modal after success
      openFeedbackModal();
    } catch (err) {
      console.error('Error inviting new LP:', err);
    }
  };


  return {
    existingLpForm,
    inviteLpForm,
    onSubmitExisting,
    onSubmitInvitation,
    isAddingExisting: creatingLP, // for showing loading only on Add button
    isInvitingNew: invitingLP,     // for showing loading only on Invite button
  };
};

export default useLimitedPartnerFundForm;
