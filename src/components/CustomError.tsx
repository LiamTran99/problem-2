'use client';

import { Box } from '@chakra-ui/react';

type CustomErrorLabelProps = {
    message?: string;
};

function CustomErrorLabel({ message }: Readonly<CustomErrorLabelProps>) {
    return (
        <Box mb="3" p={2} color="red">
            {message ?? ' '}
        </Box>
    );
}

export {
    CustomErrorLabel,
};
