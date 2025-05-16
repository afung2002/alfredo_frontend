import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateInvitationMutation,
} from '@services/api/baseApi';
import { useCommaFormattingWatcher } from '@hooks/useCommaFormattingWatcher';
import {
  normalizeUrl,
  parseCommaSeparatedNumber,
} from '@utils/index';

// Validation schemas
const selectExistingSchema = z.object({
  limitedPartner: z.object(
    {
      email: z.string().email(),
      name: z.string().min(1),
    },
    {
      required_error: 'Limited partner is required',
    }
  ),
  investedAmount: z
    .string()
    .refine((val) => parseCommaSeparatedNumber(val)! >= 0, {
      message: 'Invested amount must be a positive number',
    }),
});

const inviteNewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  website: z
    .string()
    .optional()
    .transform((val) => (val ? normalizeUrl(val) : ''))
    .refine(
      (val) => {
        if (!val) return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Website must be a valid URL' }
    ),
  fundAmount: z
    .string()
    .refine((val) => parseCommaSeparatedNumber(val)! >= 0, {
      message: 'Fund amount must be a positive number',
    }),
  description: z.string().optional(),
});

export type SelectLimitedPartnerFormData = z.infer<typeof selectExistingSchema>;
export type InviteLimitedPartnerFormData = z.infer<typeof inviteNewSchema>;

const useLimitedPartnerFundForm = (
  fundId: number | string | undefined,
  closeModal: () => void
, openFeedbackModal: () => void) => {

  const [createInvitation, { isLoading: invitingLP }] =
    useCreateInvitationMutation();

  const existingLpForm = useForm<SelectLimitedPartnerFormData>({
    resolver: zodResolver(selectExistingSchema),
    defaultValues: {
      limitedPartner: undefined,
      investedAmount: '',
    },
    mode: 'onChange',
    
  });

  const inviteLpForm = useForm<InviteLimitedPartnerFormData>({
    resolver: zodResolver(inviteNewSchema),
    defaultValues: {
      name: '',
      email: '',
      website: '',
      fundAmount: '',
      description: '',
    },
    mode: 'onChange',

  })

  // ✅ Auto-format numeric fields
  useCommaFormattingWatcher(existingLpForm.watch, existingLpForm.setValue, ['investedAmount']);
  useCommaFormattingWatcher(inviteLpForm.watch, inviteLpForm.setValue, ['fundAmount']);

  // ✅ Normalize website on blur
  const handleInviteWebsiteBlur = () => {
    const current = inviteLpForm.watch('website');
    if (current) {
      inviteLpForm.setValue('website', normalizeUrl(current), { shouldValidate: true });
    }
  };

  // ✅ Existing LP submission
  const onSubmitExisting = async (data: SelectLimitedPartnerFormData) => {
    if (!fundId) return;
    try {
      await createInvitation({
        fund: Number(fundId),
        invested_amount: data.investedAmount.replace(/,/g, ''),
        email_address: data.limitedPartner.email,
        public_metadata: {
          name: data.limitedPartner.name,
          role: 'limited_partner',
        },
      }).unwrap();

      existingLpForm.reset();
      closeModal();
      openFeedbackModal();
    } catch (err) {
      console.error('Error adding existing LP:', err);
    }
  };

  // ✅ Invite new LP submission
  const onSubmitInvitation = async (data: InviteLimitedPartnerFormData) => {
    if (!fundId) return;
    try {
      await createInvitation({
        fund: Number(fundId),
        invested_amount: data.fundAmount.replace(/,/g, ''),
        email_address: data.email,
        public_metadata: {
          name: data.name,
          role: 'limited_partner',
        },
      }).unwrap();

      inviteLpForm.reset({
        name: '',
        email: '',
        website: '',
        fundAmount: '',
        description: '',
      });
      closeModal();
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
    isInvitingNew: invitingLP,
    handleInviteWebsiteBlur, // 👈 expose this for onBlur
  };
};

export default useLimitedPartnerFundForm;
