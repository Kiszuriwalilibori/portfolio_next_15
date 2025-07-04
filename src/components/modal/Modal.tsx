import Icons from "@icons";
import { Actions, Content, CloseButton, Dialog, Subtitle, Title, TitleText } from "./Modal.styles";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    content?: React.ReactNode;
}

export default function Modal(props: ModalProps) {
    const { isOpen, onClose, title, actions, content, subtitle } = props;

    return (
        <Dialog open={isOpen} keepMounted onClose={onClose} disableScrollLock>
            <Title>
                <TitleText>{title}</TitleText>
                {subtitle && <Subtitle>{subtitle} </Subtitle>}
                <CloseButton aria-label="Close dialog" onClick={onClose}>
                    {Icons.close}
                </CloseButton>
            </Title>
            <Content>{content}</Content>
            <Actions>{actions}</Actions>
        </Dialog>
    );
}
