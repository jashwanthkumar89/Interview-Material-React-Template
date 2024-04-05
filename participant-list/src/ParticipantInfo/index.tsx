import React, { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import forwardImg from "../Assets/Forward.svg";
import "./ParticipantInfo.scss"
import { Card, Placeholder } from 'react-bootstrap';
import { codeType, ParticipantInfoType, participants } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardItem from '../CardItem';
import ModalInfo from '../ModalInfo';

const ParticipantInfo: FC<ParticipantInfoType> = ({ participants, dataLoaded }) => {

    const navigate = useNavigate();


    const [participant, setParticipant] = useState<participants>();
    const [participantFound, setParticipantFound] = useState(false);
    const [diseases, setDiseases] = useState<{ name: any; code: any; }[]>([])
    const [diseasesFetched, setDiseasesFetched] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContents, setModalContents] = useState<{leftItem:string, rightItem:string}>()

    const { id } = useParams();
    if (id === undefined) navigate("/")
    else {
        if (dataLoaded && !participantFound) {
            let temp_participant = participants.filter((item) => item.id === Number(id))[0]
            if(temp_participant !== undefined) {
                setParticipant(temp_participant);
                setParticipantFound(true);
            }
        }
    }

    const getData = async (codes: codeType[]) => {

        let listDiseases: { name: any; code: any; }[] = []

        await Promise.all(codes.map(async (code) => {

            let search_fields = "code"
            let search_term = code.icdCode
            let max_list = 100
            let base_url = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=${search_fields}&terms=${search_term}&maxList=${max_list}`

            try {
                const response = await axios.get(base_url)
                for (let result of response.data[3]) {
                    if (result[0] === code.icdCode) {
                        listDiseases.push({
                            name: result[1],
                            code: result[0]
                        })
                    }
                    break;
                }
            } catch (e) {
                console.log(e, "for code: ", code.icdCode);
            }
        }))
        setDiseases(listDiseases)
        setDiseasesFetched(true);
    }
    
    //When the data is loaded but the id on the url is invalid, it redirects to the home page.
    useEffect(()=>{
        if(dataLoaded && participant === undefined) {
            navigate("/")
        }
    },[dataLoaded, navigate, participant])

    useEffect(() => {
        if (participant) getData(participant.diagnoses);
    }, [participant])

    return (
        <>
            <Placeholder />
            <Button variant="primary" className="btn-primary back-btn" onClick={()=>{navigate("/")}}>
                <img
                    src={forwardImg}
                    alt="back-alt"
                />
                <div>
                    Back
                </div>
            </Button>
            <Card className='card-style-info'>
                <Card.Body>
                    <Card.Title className='card-title'>
                        <div className='left'>
                            {participant?.name}
                        </div>
                    </Card.Title>
                    <div className='badge-style-info'> ICD Codes ({diseasesFetched?diseases.length:participant?.count})</div>
                    {!diseasesFetched ? <>
                    {/* Place Holder before the data is populated  */}
                        <Placeholder as={Card.Title} animation="glow" className='card-title-placeholder'>
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow" className='participant-detail-info'>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow" className='participant-detail-info'>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow" className='participant-detail-info'>
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow" className='participant-detail-info'>
                            <Placeholder xs={12} />
                        </Placeholder>
                    </> : 
                    <div className='list-container-info'>
                        {diseases.map((item, index) => {
                            return (
                                <CardItem leftItem={item.name} rightItem={item.code} className='participant-detail-info' key={index} 
                                onClick={()=>{
                                    setModalOpen(true);
                                    setModalContents({
                                        leftItem: item.name,
                                        rightItem: item.code
                                    })
                                }}/>
                            )
                        })}
                    </div>}

                    {/* Modal for opening a bigger place to view the diagnosis and code */}
                    <ModalInfo modalTitle={"Diagnosis and Code"} lgShow={modalOpen} setLgShow={setModalOpen}>
                        <CardItem leftItem={modalContents?.leftItem} rightItem={modalContents?.rightItem} className='participant-detail-info-modal-view'/>
                    </ModalInfo>

                </Card.Body>
            </Card>
        </>
    )
}

export default ParticipantInfo;