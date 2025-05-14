import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateFundLimitedPartnerMutation,
  useCreateInvitationMutation,
} from '@services/api/baseApi';
import { useNavigate } from 'react-router-dom';
import {
  parseCommaSeparatedNumber,
  normalizeUrl,
} from '@utils/index';
import { useCommaFormattingWatcher } from '@hooks/useCommaFormattingWatcher';

const selectExistingSchema = z.object({
  limitedPartner: z.string().min(1, 'Limited partner is required'),
  investedAmount: z
    .string()
    .refine(
      (val) => {
        const num = parseCommaSeparatedNumber(val);
        return num !== null && num > 0;
      },
      { message: 'Invested amount must be a positive number' }
    ),
  fund: z.string().min(1, 'Fund is required'),
});

const inviteNewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  website: z
    .string()
    .optional()
    .transform((val) => (val ? normalizeUrl(val) : ''))
    .refine((val) => {
      if (!val) return true;
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: 'Website must be a valid URL' }),
  fundAmount: z
    .string()
    .refine(
      (val) => {
        const num = parseCommaSeparatedNumber(val);
        return num !== null && num > 0;
      },
      { message: 'Fund amount must be a positive number' }
    ),
  description: z.string().optional(),
  fund: z.string().min(1, 'Fund is required'),
});

export type SelectLimitedPartnerFormData = z.infer<typeof selectExistingSchema>;
export type InviteLimitedPartnerFormData = z.infer<typeof inviteNewSchema>;

const useLimitedPartnerFundForm = (closeModal: () => void) => {
  const [createLimitedPartner, { isLoading: creatingLP }] =
    useCreateFundLimitedPartnerMutation();
  const [createInvitation, { isLoading: invitingLP }] =
    useCreateInvitationMutation();
  const navigate = useNavigate();

  const existingLpForm = useForm<SelectLimitedPartnerFormData>({
    resolver: zodResolver(selectExistingSchema),
    defaultValues: { limitedPartner: '', investedAmount: '', fund: '' },
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
      fund: '',
    },
    mode: 'onChange',
  });

  // 👉 Apply comma formatting watcher for numeric fields
  useCommaFormattingWatcher(existingLpForm.watch, existingLpForm.setValue, ['investedAmount']);
  useCommaFormattingWatcher(inviteLpForm.watch, inviteLpForm.setValue, ['fundAmount']);

  // 👉 Handle website field normalization on blur
  const handleInviteWebsiteBlur = () => {
    const current = inviteLpForm.watch('website');
    if (current) {
      inviteLpForm.setValue('website', normalizeUrl(current), { shouldValidate: true });
    }
  };

  const onSubmitExisting = async (data: SelectLimitedPartnerFormData) => {
    try {
      await createLimitedPartner({
        limited_partner: data.limitedPartner,
        invested_amount: data.investedAmount.replace(/,/g, ''),
        fund: Number(data.fund),
      }).unwrap();
      existingLpForm.reset();
      navigate(-1);
      closeModal();
    } catch (err) {
      console.error('Error adding existing LP:', err);
    }
  };

  const onSubmitInvitation = async (data: InviteLimitedPartnerFormData) => {
    try {
      await createInvitation({
        fund: Number(data.fund),
        invested_amount: data.fundAmount.replace(/,/g, ''),
        email_address: data.email,
        public_metadata: {
          name: data.name,
          role: 'limited_partner',
        },
      }).unwrap();
      inviteLpForm.reset();
      closeModal();
      navigate(-1);
    } catch (err) {
      console.error('Error inviting new LP:', err);
    }
  };

  return {
    existingLpForm,
    inviteLpForm,
    onSubmitExisting,
    onSubmitInvitation,
    isAddingExisting: creatingLP,
    isInvitingNew: invitingLP,
    handleInviteWebsiteBlur, // 👈 use this on the `website` input field
  };
};

export default useLimitedPartnerFundForm;
