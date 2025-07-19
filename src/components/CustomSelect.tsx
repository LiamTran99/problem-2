"use client"

import {
    HStack,
    IconButton,
    Portal,
    Select,
    createListCollection,
    useSelectContext,
} from "@chakra-ui/react"
import React from "react";

interface Item {
    label: string
    value: string
    icon: React.ReactNode
}

interface CustomSelectProps {
    items: Item[]
    size?: string
    className?: string
    onChange: (value: string) => void
    defaultValue: string[]
    value: string[]
}

const SelectTrigger = () => {
    const select = useSelectContext();
    const items = select.selectedItems as Item[]; // Type assertion

    // Check if there are selected items and use a fallback if not
    return (
        <IconButton
            px="2"
            variant="outline"
            size="sm"
            {...select.getTriggerProps()}
        >
            {select.hasSelectedItems && items.length > 0 ? (
                <HStack spacing={2}>
                    {/* Display icon on the left and label on the right */}
                    {items[0].icon}
                    <span>{items[0].label}</span>
                </HStack>
            ) : (
                <></> // Fallback when no item is selected
            )}
        </IconButton>
    );
};


const CustomSelect = ({
                          defaultValue,
                          value,
                          items,
                          size = "sm",
                          className,
                          onChange
                      }: CustomSelectProps) => {
    const frameworks = createListCollection({
        items,
    })

    return (
        <Select.Root
            className={className}
            positioning={{ sameWidth: true }}
            collection={frameworks}
            size={size}
            width="100%"
            defaultValue={defaultValue}
            value={value}
            onValueChange={(item) => onChange(item.items[0].value)}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <SelectTrigger />
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content minW="100%" width="100%">
                        {frameworks.items.map((framework) => (
                            <Select.Item item={framework} key={framework.value}>
                                <HStack>
                                    {framework.icon}
                                    {framework.label}
                                </HStack>
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}

export default CustomSelect
