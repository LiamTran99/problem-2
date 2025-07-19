'use client';

import {
    Toaster as ChakraToaster,
    Portal,
    Stack,
    Toast,
    createToaster,
} from '@chakra-ui/react';

export const createToast: ReturnType<typeof createToaster> = createToaster({
    placement: 'bottom',
    pauseOnPageIdle: true,
    duration: 3000,
    offsets: '20px',
});

export const Toaster = () => {
    return (
        <Portal>
            <ChakraToaster toaster={createToast} insetInline={{ mdDown: '4' }}>
                {toast => (
                    <Toast.Root width={{ md: 'sm' }}>
                        <Toast.Indicator />
                        <Stack gap="1" flex="1" maxWidth="100%">
                            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                            {toast.description && (
                                <Toast.Description>{toast.description}</Toast.Description>
                            )}
                        </Stack>
                        {toast.action && (
                            <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
                        )}
                        {toast.meta?.closable && <Toast.CloseTrigger />}
                    </Toast.Root>
                )}
            </ChakraToaster>
        </Portal>
    );
};
