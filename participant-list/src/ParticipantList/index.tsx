import React, { FC, useState } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import downImg from '../Assets/orderFilter_Down.svg';
import upImg from '../Assets/orderFilter_Up.svg';
import { participantsType } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ParticipantList.scss";
import { useNavigate } from 'react-router-dom';
import CardItem from '../CardItem';

const ParticipantList: FC<participantsType> = ({ participants, sortFunction, dataLoaded }): JSX.Element => {
    const [sortImage, setSortImage] = useState(downImg);
    const [sortImageName, setSortImageName] = useState(downImg);
    const [hoverIndex, setHoverIndex] = useState(-1);
    const navigate = useNavigate();
    const MouseOver = (index: number) => {
        setHoverIndex(index);
    }
    const MouseOut = () => {
        setHoverIndex(-1);
    }
    return (
        <>
            <div className='badge-style'>Participants</div>
            <Card className='card-style'>
                <Card.Body>
                    <Card.Title className='card-title'>
                        <div className='left'>
                            <div>
                                Participant Name
                            </div>
                            <img
                                src={sortImageName}
                                alt="Sort"
                                onClick={() => {
                                    sortFunction("NAME", sortImageName === downImg)
                                    setSortImageName(sortImageName === downImg ? upImg : downImg)
                                }}
                            />
                        </div>

                        <div className='right'>
                            <div>
                                ICD Codes
                            </div>
                            <img
                                src={sortImage}
                                alt="Sort"
                                onClick={() => {
                                    sortFunction("COUNT", sortImage === downImg)
                                    setSortImage(sortImage === downImg ? upImg : downImg)
                                }}
                            />
                        </div>
                    </Card.Title>
                    
                    {/* Place Holder before the data is populated  */}
                    {!dataLoaded ? <>
                        <Placeholder animation="glow" className='participant-detail'>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder animation="glow" className='participant-detail'>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder animation="glow" className='participant-detail'>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder animation="glow" className='participant-detail'>
                            <Placeholder xs={12} />
                        </Placeholder>
                    </> :
                        <div className='list-container'>
                            {participants.map((item, index) => {
                                return (
                                    // OnClick it navigates to the page with participants ID
                                    <CardItem className='participant-detail' key={index} onMouseOver={() => { MouseOver(index) }} onMouseOut={() => { MouseOut() }}
                                        style={{ border: hoverIndex === index ? "5px solid #4D7EF890" : "0px" }}
                                        onClick={() => { navigate(`/info/${item.id}`) }} leftItem={item.name} rightItem={item.count} />
                                )
                            })}
                        </div>
                    }

                </Card.Body>
            </Card>
        </>
    )
}

export default ParticipantList;