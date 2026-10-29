import type { Meta, StoryObj } from "@storybook/react-native";
import type { ComponentType } from "react";
import { View } from "react-native";
import { ThemedText, type IconProps } from "midestic-rn-library";
import {
  AccountProfileIcon,
  ActiveEarningIcon,
  ActiveHomeIcon,
  AddLocationIcon,
  ArrowLeft,
  ArrowRightIcon,
  CalendarIcon,
  CameraIcon,
  CarIcon,
  CheckCircleIcon,
  CheckIcon,
  CheckedIcon,
  ContactIcon,
  CopyIcon,
  CurrencyIcon,
  EditIcon,
  EarningIcon,
  EmailIcon,
  ExpandIcon,
  FilledCalendarIcon,
  FlagIcon,
  GiftIcon,
  HomeInactiveIcon,
  ImageIcon,
  LocationIcon,
  LogoutIcon,
  MapIcon,
  MessageIcon,
  MicOffIcon,
  MinusIcon,
  MoneyIcon,
  MoreIcon,
  NotificationIcon,
  PhoneIcon,
  PhoneMsgIcon,
  PhoneOffIcon,
  PlusIcon,
  ProfileIcon,
  ProfileInactiveIcon,
  RecentRideIcon,
  ReferralIcon,
  RightArrowIcon,
  SavedAddress,
  SearchIcon,
  SecurityIcon,
  SendIcon,
  ShareIcon,
  StarIcon,
  StarRatingIcon,
  StatusDotIcon,
  StatusIcon,
  SuccessIcon,
  TermsIcon,
  TicketIcon,
  TimeIcon,
  TimeInactiveIcon,
  TimerIcon,
  VerifiedIcon,
  VolumeIcon,
} from "midestic-rn-library";

const icons: [string, ComponentType<IconProps>][] = [
  ["ArrowLeft", ArrowLeft],
  ["ArrowRightIcon", ArrowRightIcon],
  ["RightArrowIcon", RightArrowIcon],
  ["CalendarIcon", CalendarIcon],
  ["FilledCalendarIcon", FilledCalendarIcon],
  ["CameraIcon", CameraIcon],
  ["ImageIcon", ImageIcon],
  ["CurrencyIcon", CurrencyIcon],
  ["ActiveHomeIcon", ActiveHomeIcon],
  ["HomeInactiveIcon", HomeInactiveIcon],
  ["TimeIcon", TimeIcon],
  ["TimeInactiveIcon", TimeInactiveIcon],
  ["ProfileIcon", ProfileIcon],
  ["ProfileInactiveIcon", ProfileInactiveIcon],
  ["SearchIcon", SearchIcon],
  ["RecentRideIcon", RecentRideIcon],
  ["LocationIcon", LocationIcon],
  ["AddLocationIcon", AddLocationIcon],
  ["StatusIcon", StatusIcon],
  ["StatusDotIcon", StatusDotIcon],
  ["VerifiedIcon", VerifiedIcon],
  ["CheckedIcon", CheckedIcon],
  ["CheckIcon", CheckIcon],
  ["CheckCircleIcon", CheckCircleIcon],
  ["StarIcon", StarIcon],
  ["StarRatingIcon", StarRatingIcon],
  ["CarIcon", CarIcon],
  ["PhoneIcon", PhoneIcon],
  ["MessageIcon", MessageIcon],
  ["PhoneMsgIcon", PhoneMsgIcon],
  ["PhoneOffIcon", PhoneOffIcon],
  ["MicOffIcon", MicOffIcon],
  ["VolumeIcon", VolumeIcon],
  ["MoreIcon", MoreIcon],
  ["ExpandIcon", ExpandIcon],
  ["TicketIcon", TicketIcon],
  ["SuccessIcon", SuccessIcon],
  ["PlusIcon", PlusIcon],
  ["MinusIcon", MinusIcon],
  ["SendIcon", SendIcon],
  ["ShareIcon", ShareIcon],
  ["SecurityIcon", SecurityIcon],
  ["AccountProfileIcon", AccountProfileIcon],
  ["GiftIcon", GiftIcon],
  ["SavedAddress", SavedAddress],
  ["NotificationIcon", NotificationIcon],
  ["ContactIcon", ContactIcon],
  ["ReferralIcon", ReferralIcon],
  ["EditIcon", EditIcon],
  ["EmailIcon", EmailIcon],
  ["CopyIcon", CopyIcon],
  ["LogoutIcon", LogoutIcon],
  ["TermsIcon", TermsIcon],
  ["TimerIcon", TimerIcon],
  ["MoneyIcon", MoneyIcon],
  ["EarningIcon", EarningIcon],
  ["ActiveEarningIcon", ActiveEarningIcon],
  ["MapIcon", MapIcon],
  ["FlagIcon", FlagIcon],
];

const meta = {
  title: "Icons/IconSet",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <View className="w-[460px] flex-row flex-wrap gap-[8px]">
      {icons.map(([label, Icon]) => (
        <View
          key={label}
          className="w-[104px] items-center gap-[8px] rounded-[12px] border border-[#E7EAEB] bg-white py-[14px]"
        >
          <Icon width={24} height={24} />
          <ThemedText className="text-[11px] text-[#808080]">{label}</ThemedText>
        </View>
      ))}
    </View>
  ),
};

export const DefaultSizes: Story = {
  render: () => (
    <View className="w-[460px] flex-row flex-wrap gap-[16px]">
      {icons.map(([label, Icon]) => (
        <View
          key={label}
          className="w-[104px] items-center gap-[8px] rounded-[12px] border border-[#E7EAEB] bg-white py-[14px]"
        >
          <Icon />
          <ThemedText className="text-[11px] text-[#808080]">{label}</ThemedText>
        </View>
      ))}
    </View>
  ),
};
