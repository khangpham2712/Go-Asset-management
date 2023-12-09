import { Flex } from "antd";
import "./Header.css";

export const Header = () => {
    return(
        <Flex className="Header" justify="center">
            <div style={{flex: '5'}} />
            <Flex style={{flex: '3'}} vertical align='flex-start' justify='center'>
                <div style={{fontSize: '30px', fontWeight: 'bold', color: '#fff', width: 'fit-content', paddingRight: '100px', marginRight: '0'}}>ASSET MANAGEMENT SYSTEM</div>
                <Flex style={{width: '100%', padding: '8px 100px 0 0'}}>
                    <div style={{flex: '5', backgroundColor: '#FF0099', height: '6px', borderRadius: '10px 0 0 10px'}}></div>
                    <div style={{flex: '3', backgroundColor: '#FFC700', height: '6px', borderRadius: '0 10px 10px 0', marginRight: '40px'}}></div>
                </Flex>
            </Flex>
        </Flex>
    )
}