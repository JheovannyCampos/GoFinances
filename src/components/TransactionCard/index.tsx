import React from "react";
import { categories } from "../../utils/categories";
import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from "./styles";

export interface TransactionCardProps{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props{
    data: TransactionCardProps;
}

export function TransactionCard({ data }:Props) {
    const category = categories.filter(
        item => item.key === data.category
    )[0];
    return(
        <Container>
            <Title>{data.name}</Title>
            
            <Amount type={data.type}>
                { data.type === 'negative' && '- '}
                { data.amount }
            </Amount>

            <Footer>
                <Category >
                    <Icon name={category.icon}/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                
                <Date>{data.date}</Date>
            </Footer>
        </Container>        
    )
}

//    const TransactionCard: React.FC<Props> = (props) => {
//        const {data} = props

//     return (
//         <Container>
//             <Title>{data.title}</Title>
            
//             <Amount>{data.amount}</Amount>

//             <Footer>
//                 <Category >
//                     <Icon name={data.category?.icon}/>
//                     <CategoryName>{data.category?.name}</CategoryName>
//                 </Category>
                
//                 <Date>{data.date}</Date>
//             </Footer>
//         </Container>
//     )
// }

// export default TransactionCard;