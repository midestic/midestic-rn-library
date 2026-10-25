// import React, { useEffect, useMemo, useState } from "react";
// import { Modal, Pressable, Text, View } from "react-native";

// type CalendarProps = {
//   visible: boolean;
//   value?: Date | null;
//   onClose: () => void;
//   onApply: (date: Date | null) => void;
// };

// const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const YEARS = (() => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let year = currentYear; year >= currentYear - 100; year--) {
//     years.push(year);
//   }
//   return years;
// })();

// const isSameDate = (date1: Date, date2: Date) => {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   );
// };

// const Calendar = ({ visible, value, onClose, onApply }: CalendarProps) => {
//   const today = new Date();

//   const [currentMonth, setCurrentMonth] = useState(value ?? today);

//   const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);

//   const [showYearGrid, setShowYearGrid] = useState(false);

//   useEffect(() => {
//     if (visible) {
//       setSelectedDate(value ?? null);
//       setCurrentMonth(value ?? today);
//     }
//   }, [visible, value]);

//   const days = useMemo(() => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();

//     const firstDay = new Date(year, month, 1);

//     const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     const previousMonthDays = new Date(year, month, 0).getDate();

//     const calendarDays = [];

//     for (let i = startingDay - 1; i >= 0; i--) {
//       calendarDays.push({
//         day: previousMonthDays - i,
//         currentMonth: false,
//         date: new Date(year, month - 1, previousMonthDays - i),
//       });
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       calendarDays.push({
//         day: i,
//         currentMonth: true,
//         date: new Date(year, month, i),
//       });
//     }

//     let nextDay = 1;

//     while (calendarDays.length < 42) {
//       calendarDays.push({
//         day: nextDay,
//         currentMonth: false,
//         date: new Date(year, month + 1, nextDay),
//       });

//       nextDay++;
//     }

//     return calendarDays;
//   }, [currentMonth]);

//   const goToPreviousMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
//   };

//   const handleYearSelect = (year: number) => {
//     setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
//     setShowYearGrid(false);
//   };

//   const handleClear = () => {
//     setSelectedDate(null);
//   };

//   const handleApply = () => {
//     onApply(selectedDate);
//     onClose();
//   };

//   return (
//     <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
//       <View className="flex-1 items-center justify-center bg-black/30 px-[20px]">
//         <View className="w-full max-w-[380px] rounded-[20px] bg-white px-[20px] pb-[20px] pt-[20px]">
//           {showYearGrid ? (
//             <>
//               <View className="mb-[16px] flex-row justify-between">
//                 <Pressable
//                   onPress={() => setShowYearGrid(false)}
//                   className="h-[32px] w-[32px] items-center justify-center"
//                 >
//                   <Text className="text-[24px] text-[#121212]">‹</Text>
//                 </Pressable>
//                 <Text className="font-sans text-[20px] font-[700] text-[#121212]">Select Year</Text>
//                 <View className="w-[32px]" />
//               </View>

//               <View className="mt-[8px] h-[80vh] flex-row flex-wrap border">
//                 {YEARS.map((year) => {
//                   const selected = year === currentMonth.getFullYear();
//                   return (
//                     <View key={year} className="mb-[8px] w-[33.33%] items-center">
//                       <Pressable
//                         onPress={() => handleYearSelect(year)}
//                         className={`h-[44px] w-[44px] items-center justify-center rounded-full ${
//                           selected ? "bg-primary" : "bg-[#F5F5F5]"
//                         }`}
//                       >
//                         <Text
//                           className={`font-sans text-[14px] font-[600] ${selected ? "text-white" : "text-[#121212]"}`}
//                         >
//                           {year}
//                         </Text>
//                       </Pressable>
//                     </View>
//                   );
//                 })}
//               </View>
//             </>
//           ) : (
//             <>
//               <View className="flex-row items-center justify-between">
//                 <Text className="font-sans text-[24px] font-[700] text-[#121212]">
//                   {MONTHS[currentMonth.getMonth()]}
//                 </Text>

//                 <View className="flex-row items-center gap-[8px]">
//                   <Text className="font-sans text-[20px] font-[700] text-[#121212]">{currentMonth.getFullYear()}</Text>

//                   <Pressable
//                     onPress={() => setShowYearGrid(true)}
//                     className="h-[32px] w-[32px] items-center justify-center"
//                   >
//                     <Text className="text-[20px] text-[#666666]">▼</Text>
//                   </Pressable>

//                   <Pressable onPress={goToPreviousMonth} className="h-[32px] w-[32px] items-center justify-center">
//                     <Text className="text-[28px] text-[#121212]">‹</Text>
//                   </Pressable>

//                   <Pressable onPress={goToNextMonth} className="h-[32px] w-[32px] items-center justify-center">
//                     <Text className="text-[28px] text-[#121212]">›</Text>
//                   </Pressable>
//                 </View>
//               </View>

//               <View className="mt-[24px] flex-row">
//                 {WEEK_DAYS.map((day) => (
//                   <View key={day} className="w-[14.285%] items-center">
//                     <Text className="font-sans text-[11px] font-[400] text-[#121212]">{day}</Text>
//                   </View>
//                 ))}
//               </View>

//               <View className="mt-[16px] flex-row flex-wrap">
//                 {days.map((item, index) => {
//                   const selected = selectedDate && isSameDate(item.date, selectedDate);

//                   const todayDate = isSameDate(item.date, today);

//                   return (
//                     <View key={`${item.date.toISOString()}-${index}`} className="mb-[4px] w-[14.285%] items-center">
//                       <Pressable
//                         onPress={() => setSelectedDate(item.date)}
//                         className={`h-[36px] w-[36px] items-center justify-center rounded-full ${
//                           selected ? "bg-primary" : ""
//                         }`}
//                       >
//                         <Text
//                           className={`font-sans text-[13px] ${
//                             selected ? "font-[600] text-white" : item.currentMonth ? "text-[#343A40]" : "text-[#B8B8B8]"
//                           }`}
//                         >
//                           {item.day}
//                         </Text>
//                       </Pressable>
//                     </View>
//                   );
//                 })}
//               </View>
//             </>
//           )}

//           <View className="mt-[4px] h-[1px] w-full bg-[#EEEEEE]" />

//           <View className="mt-[18px] flex-row gap-[12px]">
//             <Pressable
//               onPress={handleClear}
//               className="h-[40px] flex-1 items-center justify-center rounded-full bg-[#F5F5F5]"
//             >
//               <Text className="font-sans text-[16px] font-[500] text-primary">Clear</Text>
//             </Pressable>

//             <Pressable
//               onPress={handleApply}
//               className="h-[40px] flex-1 items-center justify-center rounded-full bg-primary"
//             >
//               <Text className="font-sans text-[16px] font-[500] text-white">Apply</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default Calendar;

import { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

export type CalendarProps = {
  visible: boolean;
  value?: Date | null;
  onClose: () => void;
  onApply: (date: Date | null) => void;
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = (() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push(year);
  }
  return years;
})();

const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const Calendar = ({ visible, value, onClose, onApply }: CalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(value ?? today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);
  const [showYearGrid, setShowYearGrid] = useState(false);

  useEffect(() => {
    if (visible) {
      setSelectedDate(value ?? null);
      setCurrentMonth(value ?? today);
    }
  }, [visible, value]);

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    const calendarDays = [];

    for (let i = startingDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: previousMonthDays - i,
        currentMonth: false,
        date: new Date(year, month - 1, previousMonthDays - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        currentMonth: true,
        date: new Date(year, month, i),
      });
    }

    let nextDay = 1;
    while (calendarDays.length < 42) {
      calendarDays.push({
        day: nextDay,
        currentMonth: false,
        date: new Date(year, month + 1, nextDay),
      });
      nextDay++;
    }

    return calendarDays;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearGrid(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
  };

  const handleApply = () => {
    onApply(selectedDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/30 px-[20px]">
        <View className="w-full max-w-[380px] rounded-[20px] bg-white px-[20px] pb-[20px] pt-[20px]">
          {showYearGrid ? (
            <>
              <View className="mb-[16px] flex-row justify-between">
                <Pressable
                  onPress={() => setShowYearGrid(false)}
                  className="h-[32px] w-[32px] items-center justify-center"
                >
                  <Text className="text-[24px] text-[#121212]">‹</Text>
                </Pressable>
                <Text className="font-sans text-[20px] font-[700] text-[#121212]">Select Year</Text>
                <View className="w-[32px]" />
              </View>
              <ScrollView className="mt-[8px] max-h-[80vh]" showsVerticalScrollIndicator={true} nestedScrollEnabled>
                <View className="flex-row flex-wrap">
                  {YEARS.map((year) => {
                    const selected = year === currentMonth.getFullYear();
                    return (
                      <View key={year} className="mb-[8px] w-[33.33%] items-center">
                        <Pressable
                          onPress={() => handleYearSelect(year)}
                          className={`h-[44px] w-[44px] items-center justify-center rounded-full ${
                            selected ? "bg-primary" : "bg-[#F5F5F5]"
                          }`}
                        >
                          <Text
                            className={`font-sans text-[14px] font-[600] ${selected ? "text-white" : "text-[#121212]"}`}
                          >
                            {year}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </>
          ) : (
            <>
              <View className="flex-row items-center justify-between">
                <Text className="font-sans text-[24px] font-[700] text-[#121212]">
                  {MONTHS[currentMonth.getMonth()]}
                </Text>
                <View className="flex-row items-center gap-[8px]">
                  <Text className="font-sans text-[20px] font-[700] text-[#121212]">{currentMonth.getFullYear()}</Text>
                  <Pressable
                    onPress={() => setShowYearGrid(true)}
                    className="h-[32px] w-[32px] items-center justify-center"
                  >
                    <Text className="text-[20px] text-[#666666]">▼</Text>
                  </Pressable>
                  <Pressable onPress={goToPreviousMonth} className="h-[32px] w-[32px] items-center justify-center">
                    <Text className="text-[28px] text-[#121212]">‹</Text>
                  </Pressable>
                  <Pressable onPress={goToNextMonth} className="h-[32px] w-[32px] items-center justify-center">
                    <Text className="text-[28px] text-[#121212]">›</Text>
                  </Pressable>
                </View>
              </View>
              <View className="mt-[24px] flex-row">
                {WEEK_DAYS.map((day) => (
                  <View key={day} className="w-[14.285%] items-center">
                    <Text className="font-sans text-[11px] font-[400] text-[#121212]">{day}</Text>
                  </View>
                ))}
              </View>
              <View className="mt-[16px] flex-row flex-wrap">
                {days.map((item, index) => {
                  const selected = selectedDate && isSameDate(item.date, selectedDate);
                  return (
                    <View key={`${item.date.toISOString()}-${index}`} className="mb-[4px] w-[14.285%] items-center">
                      <Pressable
                        onPress={() => setSelectedDate(item.date)}
                        className={`h-[36px] w-[36px] items-center justify-center rounded-full ${
                          selected ? "bg-primary" : ""
                        }`}
                      >
                        <Text
                          className={`font-sans text-[13px] ${
                            selected ? "font-[600] text-white" : item.currentMonth ? "text-[#343A40]" : "text-[#B8B8B8]"
                          }`}
                        >
                          {item.day}
                        </Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </>
          )}
          <View className="mt-[4px] h-[1px] w-full bg-[#EEEEEE]" />
          <View className="mt-[18px] flex-row gap-[12px]">
            <Pressable
              onPress={handleClear}
              className="h-[40px] flex-1 items-center justify-center rounded-full bg-[#F5F5F5]"
            >
              <Text className="font-sans text-[16px] font-[500] text-primary">Clear</Text>
            </Pressable>
            <Pressable
              onPress={handleApply}
              className="h-[40px] flex-1 items-center justify-center rounded-full bg-primary"
            >
              <Text className="font-sans text-[16px] font-[500] text-white">Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

