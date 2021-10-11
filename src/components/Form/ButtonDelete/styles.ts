import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons"

export const Container = styled(RectButton)`
    width: 21%;
    background-color: red;
    
    padding: 10px;
    border-radius: 50px;
    align-items: center;
    margin-bottom: 5px;
`;

export const Title = styled(Feather)`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.shape};
`;