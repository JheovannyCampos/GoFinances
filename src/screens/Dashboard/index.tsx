import React, { useCallback, useEffect, useState } from "react";

import { ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/core";

import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer,
 } from "./styles";
import { Button } from "../../components/Form/Button";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps{
    amount: string;
    lastTransaction: string;
}
interface HightlightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HightlightData>({} as HightlightData);

    const theme = useTheme();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
        ){

        const lastTransaction = new Date(
        Math.max.apply(Math, collection
        .filter(transaction  => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())))
        
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`;
    }

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            }else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return{
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        setTransactions(transactionsFormatted);
        setIsLoading(false);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
        const totalInterval = `01 a ${lastTransactionEntries}`

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                 style: 'currency',
                 currency: 'BRL',  
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`, 
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',   
                   }),
                   lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',   
                   }),
                   lastTransaction: totalInterval
            }
        });

    }
    async function removeAll() {    
        const dataKey = '@gofinances:transactions';
        await AsyncStorage.removeItem(dataKey);
    }

    useEffect(() => {
        loadTransactions();
    },[])
    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    return(
        <Container>
            {
                isLoading ? 
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary}
                        size= "large"
                    /> 
                </LoadContainer> :
            <>
                <Header>
                    <UserWrapper>    
                        <UserInfo>
                            <Photo source={{uri : 'https://avatars.githubusercontent.com/u/53500639?v=4'}}
                            />
                            <User>
                                <UserGreeting>Olá </UserGreeting>
                                <UserName>Jheovanny</UserName>
                            </User>
                        </UserInfo>
                        <LogoutButton
                            onPress={() => {}}
                        >
                            <Icon name="power" />
                        </LogoutButton>
                    </UserWrapper> 
                </Header>
                <HighlightCards>
                    <HighlightCard 
                        title="Entradas" 
                        amount={highlightData?.entries?.amount}
                        lastTransaction={highlightData?.entries?.lastTransaction} 
                        type="up"
                    /> 
                    <HighlightCard 
                        title="Saídas" 
                        amount={highlightData?.expensives?.amount}
                        lastTransaction={highlightData?.expensives?.lastTransaction}
                        type="down"
                    />  
                    <HighlightCard 
                        title="Total" 
                        amount={highlightData?.total?.amount}
                        lastTransaction={highlightData?.total?.lastTransaction} 
                        type="total"
                    />
                </HighlightCards>
            
                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList 
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <TransactionCard data={item}/>}
                        showsVerticalScrollIndicator={false}
                    />
                    <Button
                        title="Apagar itens"
                        onPress={() => removeAll()}
                    />
                </Transactions>
                
            </>
            }
        </Container>
    )
}