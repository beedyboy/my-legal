import React, { Fragment, useContext, useEffect, useState } from 'react'
import ConversationStore from '../../stores/ConversationStore'
import { Badge, Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'; 
import { observer } from 'mobx-react';
import AddConversation from './AddConversation';

const Conversation = ({id, respondent}) => {
    const convoStore = useContext(ConversationStore);
    const { allConversations: conversations, fetchConversation } = convoStore;
    const [reply, setReply] = useState(false)
    useEffect(() => {
        fetchConversation(parseInt(id)); 
    }, [id])
    return (
        <Fragment>
            <Row>
                <Col md="12">
                   <Card>
                       <CardHeader>
                           <Button color="primary" onClick={() => setReply(!reply)}>Reply</Button>
                       </CardHeader>
                       <CardBody>
                     {reply ?   <AddConversation id={id} respondent={respondent} /> : ''}
                       </CardBody>
                   </Card>
                </Col>
            
                <Col md="12">
                    {conversations && conversations.map((convo) => (
                        <Card className="p-2" key={convo.id}>
                            <CardHeader>
                            {convo.created_at}
                            </CardHeader>
                           <CardBody>
                           {ReactHtmlParser(convo.description)}
                           </CardBody>
                        </Card>
                    ))}
                </Col>
            </Row>

        </Fragment>
    )
}

export default observer(Conversation);
