
import imgIni from '../imagens/ini.png';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './Css/TelaCadastrarGrupo.css';
import {useNavigate} from 'react-router-dom';
import React, {useContext, useState, useEffect} from 'react';
import Axios from "axios";
import MyContext from '../contexts/myContext';

const TelaCadastrarGrupo = () => {
    const navigate = useNavigate();
    const [descricaoGrupo, setDescricaoGrupo] = useState();
    const {logado, setLogado} =useContext(MyContext);

    

    async function salvar(){

        try {
            
      const res = await Axios.post("http://localhost:3000/grupo/criar", {descricaoGrupo:descricaoGrupo}, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })

        if(res.status === 201){
            window.alert("Grupo Cadastrado");
            setDescricaoGrupo('');
            navigate('/TelaProduto')
        }
        
        

    } catch (error) {
        console.log(error)
            if(error.response.status === 400){
                window.alert("Preencha o campo descrição")
            }
    }

    }



return(
    <>
                 <header className='inicio'>
                    <Image src={imgIni} className = 'imgIni'></Image>
                </header>
                
    <div className="container">
                
        <div className="row">
        
         
             
                <div className='fundo'>
                <Form className='formGrupo'> 
                    <h1 className='tituloGrupo'>Grupo</h1>   
                <Row className="mb-3">
               
                        
                        <div className=' descricao'>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control id="descricao" type="text" value={descricaoGrupo} onChange={(e) => setDescricaoGrupo(e.target.value)} placeholder= "Descrição..."/>
                        </div>
       
                </Row>   
                    
                </Form>    
                </div>
                <Button className='botaoGrup' onClick={salvar}>Salvar</Button>
                <Button className='botaoGrup' onClick={()=> navigate('/TelaProduto')}>Cancelar</Button> 


        </div>
    </div>
    </>
);

}

export default TelaCadastrarGrupo;