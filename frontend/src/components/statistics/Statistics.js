import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {Container,Row,Col, Button} from 'react-bootstrap'
import {Line} from 'react-chartjs-2';
import { saveAs } from 'file-saver';

function convertToDataSet(arr){
    var xLabel;
    var yLabel;
    xLabel = arr.map(p => p.date_eaten)
    yLabel = arr.map(p => p.totalCalories)
    const dataSet = {
        labels: xLabel,
        datasets: [
            {
            label: 'Total calories',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: yLabel
            }
        ]
    }
    return dataSet
}

function convertToWeightDataSet(arr){
    var xLabel;
    var yLabel;
    xLabel = arr.map(p => p.date_recorded)
    yLabel = arr.map(p => p.number)
    const dataSet = {
        labels: xLabel,
        datasets: [
            {
            label: 'Weight (lbs)',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: yLabel
            }
        ]
    }
    return dataSet
}

const Statistics = () => {
    const auth = useSelector(state => state.auth)
    const [calorieLineState,updateCalorieLineState] = useState()
    const [weightLineState,updateWeightLineState] = useState()
    const [isLoading,setIsLoading] = useState(true)

    function saveCanvas() {
        //save to png
        const canvasSave = document.getElementById("Calorie");
        canvasSave.toBlob(function (blob) {
            saveAs(blob, "CaloriePlot.png")
        })
    
        const weightCanvasSave = document.getElementById("Weight");
        weightCanvasSave.toBlob(function (blob) {
            saveAs(blob, "WeightPlot.png")
        })
    }
    
    // need to query for the weight of the user throughout the week/month
    // maybe query for how often a food was eaten this week?

    useEffect(()=>{
        const config = {
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${auth.token}`
            }
        }
        axios.get('http://localhost:8000/api/30-day-calories',config)
        .then(res=>{
            updateCalorieLineState(convertToDataSet(res.data.data))
            
        })

        axios.get('http://localhost:8000/api/user/30-day-weight',config)
        .then(res=>{
            updateWeightLineState(convertToWeightDataSet(res.data.data))
            setIsLoading(false)
        })

    },[])

    return (
        <>
            {isLoading ? <div>Loading..</div>:
            <>
            <Container className="mt-3">
                <Row>
                    <Col >
                        <Line id="Calorie" 
                            data= {calorieLineState}
                            options = {{
                                title:{
                                    display:true,
                                    text:'Recorded calorie consumption per day.',
                                    fontSize:20,
                                },
                                scales:{
                                    yAxes:[{
                                        ticks:{
                                            beginAtZero:true
                                        }
                                    }]
                                }
                            }}
                        />
                    </Col>
                    <Col >
                        <Line id="Weight"
                            data= {weightLineState}
                            options = {{
                                title:{
                                    display:true,
                                    text:'Recorded weight per day.',
                                    fontSize:20,
                                },
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <Container className="mt-3">
                    <Col style={{display:"flex", justifyContent:"center"}}>
                        <Button onClick={saveCanvas}>Export as PNG</Button>
                    </Col>
            </Container>
            </>
            }
        </>
    )
}

export default Statistics