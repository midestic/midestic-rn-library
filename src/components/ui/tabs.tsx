import { cn } from "../../lib/utils";
import { createContext, useContext, useState } from "react";
import {
  Pressable,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type ViewProps,
} from "react-native";

type TabsContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within a Tabs component.`);
  }
  return context;
}

export type TabsProps = ViewProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({ value, defaultValue, onValueChange, children, className, ...props }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = value === undefined ? uncontrolledValue : value;

  const setValue = (nextValue: string) => {
    if (value === undefined) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <TabsContext.Provider value={{ value: selectedValue, setValue }}>
      <View className={cn("flex-col", className)} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export type TabsListProps = ViewProps;

export function TabsList({ children, className, ...props }: TabsListProps) {
  useTabsContext("TabsList");

  return (
    <View
      accessibilityRole="tablist"
      className={cn("flex-row items-center rounded-md bg-gray-100 p-1 dark:bg-gray-800", className)}
      {...props}
    >
      {children}
    </View>
  );
}

export type TabsTriggerProps = Omit<PressableProps, "onPress"> & {
  value: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export function TabsTrigger({
  value,
  children,
  className,
  disabled = false,
  accessibilityState,
  onPress,
  ...props
}: TabsTriggerProps) {
  const tabs = useTabsContext("TabsTrigger");
  const selected = tabs.value === value;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{
        ...accessibilityState,
        selected,
        disabled: disabled || accessibilityState?.disabled,
      }}
      className={cn(
        "flex-1 items-center justify-center rounded-sm px-3 py-2",
        selected && "bg-white dark:bg-gray-700",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      onPress={(event) => {
        tabs.setValue(value);
        onPress?.(event);
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export type TabsContentProps = ViewProps & {
  value: string;
};

export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const tabs = useTabsContext("TabsContent");
  if (tabs.value !== value) {
    return null;
  }

  return (
    <View className={cn("mt-2", className)} {...props}>
      {children}
    </View>
  );
}
