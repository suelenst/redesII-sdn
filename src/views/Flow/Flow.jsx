import React from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import FlowService from '../../service/FlowService';
import HelpBlock from "react-bootstrap/es/HelpBlock";
import switchService from "../../service/SwitchService";
import {Redirect} from "react-router-dom";


class Flow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoVinculo: "",
            avisoFlow: "",
            sucesso:"",
            listaSwitch: "",
            flow: {
                switch: null,
                name: "", 
                in_port: "", 
                ipv4_dst: "", 
                eth_type: "", 
                actions: ""

            }
        };

        this.FlowService = new FlowService();


        this.setState({
            listaSwitch: (
                switchService.listarNaoPaginado(
                    (sucesso) => {
                        this.setState({listaSwitch: sucesso});
                        console.log("Sucesso");
                        console.log(this.state.listaSwitch);
                    },
                    (erro) => {
                        console.log(erro);
                    }
                )
            )
        });
    }

    setValor(atributo, valor) {
        this.setState(
            (estado) => estado.flow[atributo] = valor
        );
        console.log(valor);
    }


     
        
    setActions(valor){
        let act = valor;

        this.setState(
                (anterior)=>
                        {
                        anterior.flow.actions= act;
                        
                        }
                );
        
    }


    inserirFlow() {
        let flow = this.state.flow;
        this.FlowService.inserirSemAutorizacao(flow,
            (sucesso) => {
                this.setState({cadastro: false })
                alert("Fluxo cadastrado com sucesso!");
                this.setState({sucesso: <Redirect to="/" />})

            },
            (erro) => {
                console.log("Erro!");
                console.log(erro);
                this.setState({
                    avisoFlow: "Erro inesperado no cadastro:\n" + erro.message + "\nInforme ao administrador do sistema."
                });
            }
        )
    }

    confirmar() {
        let regexIp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

        if (this.state.flow.switch && this.state.flow.name && this.state.flow.in_port && 
            this.state.flow.ipv4_dst && this.state.flow.eth_type  && this.state.flow.actions) {
                if (regexIp.test(this.state.flow.ipv4_dst)) {
                    this.inserirFlow();
                } else {
                    alert("IPV4 inválido!");
                }
        } else {
            alert("Preencha todos os campos obrigatórios!");
        }
    }


    render() {
        let campoSwitch = null;
        let erroCadastro = "";

        if (this.state.listaSwitch) {
            campoSwitch =
                <Row>
                    <FormGroup controlId="formControlSelectSwitch" className="col-md-12">
                        <ControlLabel>Switch</ControlLabel>
                        <FormControl
                            componentClass="select"
                            placeholder="Switch"
                            value={this.state.flow.switch}
                            onChange={(e) => this.setValor("switch", e.target.value)}
                            required
                        >
                            <option value="">-- Selecione --</option>
                            {this.state.listaSwitch.map((flow) => {
                                return <option
                                    value={flow.switchDPID}
                                    key={flow.switchDPID}
                                >{flow.switchDPID}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                </Row>
        } else {
            campoSwitch = "";
        }

        if (this.state.avisoFlow !== "") {
            erroCadastro =
                <div>
                    <HelpBlock>{this.state.avisoFlow}</HelpBlock>
                </div>
        }

        if (this.state.sucesso)
            return this.state.sucesso;
        else


        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Cadastro de entradas nas tabelas de fluxos dos switches"
                                content={
                                  
                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            this.confirmar()
                                        }}>
                                            {erroCadastro}
     

                                            {campoSwitch}

                 
                                            <Row>
                                                <FormGroup controlId="formHorizontalNome" className="col-md-12">
                                                    <ControlLabel>Nome</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.flow.name}
                                                        placeholder="Nome"
                                                        onChange={(e) => this.setValor("name", e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>

                                            <Row>
                                                <FormGroup controlId="formHorizontalEntrada" className="col-md-12">
                                                    <ControlLabel>Entrada</ControlLabel>
                                                    <FormControl
                                                        type="number"
                                                        value={this.state.flow.in_port}
                                                        placeholder="Entrada"
                                                        onChange={(e) => this.setValor("in_port", e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>

                                            <Row>
                                                <FormGroup controlId="formHorizontalIPV4" className="col-md-12">
                                                    <ControlLabel>IPV4</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.flow.ipv4_dst}
                                                        placeholder="IPV4"
                                                        onChange={(e) => this.setValor("ipv4_dst", e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>

                                            <Row>
                                                <FormGroup controlId="formHorizontalType" className="col-md-12">
                                                    <ControlLabel>Type</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.flow.eth_type}
                                                        placeholder="Type"
                                                        onChange={(e) => this.setValor("eth_type", e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>

                               

                                            <Row>
                                                <FormGroup controlId="formHorizontalSaida" className="col-md-12">
                                                    <ControlLabel>Saída</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.flow.actions}
                                                        placeholder="Saída"
                                                        onChange={(e) => this.setActions(e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Row>



                                            <Button
                                                className="btnSaveif"
                                                fill
                                                type="submit"
                                            >
                                                Cadastrar
                                            </Button>
                                            <div className="clearfix"/>
                                        </form>
                                    }
                                />
                            </Col>
                       
    
                        </Row>
                    </Grid>
                </div>
        );
    }
}

export default Flow;
