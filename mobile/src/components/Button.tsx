import { Button as ButtonNative, Text, IButtonProps } from "native-base"

interface ButtonProps extends IButtonProps {
    title: string;
    type?: "Primary" | "Secondary"
}

export const Button = ({ title, type = "Primary", ...props }: ButtonProps) => {
    return (
        <ButtonNative
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            textTransform="uppercase"
            bg={type === "Secondary" ? "red.500" : "yellow.500"}
            _pressed={{
                bg: type === "Secondary" ? "red.600" : "yellow.600"
            }}
            {...props}
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                color={ type === "Secondary" ? "white" : "black"}
            >
                {title}
            </Text>



        </ButtonNative>
    )
}