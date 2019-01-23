class Notification extends React.Component{
    render(){
        let finalNoti = null;
        if (this.props.type === 'error') {
            finalNoti = 
                <div style={{ backgroundColor: 'red' }}>
                    <h1>{this.props.message}</h1>
                </div>
        }
        if(!this.props.type){
             finalNoti = (
                <div style={{ backgroundColor:'gray' }}>
                    <h1>{this.props.message}</h1>
                </div>
            )
        }
        if(!this.props.message){
            finalNoti = null;
        }

        return (
            <div>
                {finalNoti}
            </div>
        )
    }
}


class App extends React.Component{
   
    render(){
        let Noti = {
            type: 'error',
            message: "Some Nice Message!"
        }
        return (
            <div>
                <Notification  {...Noti}  />
                <Form formDetails={this.formDetails}/>
            </div>
        )
    }
    
}

class  Form extends React.Component{
     state = {
        formDetails: {
            name: {
                elementConfig: {
                    type:"text",
                    placeholder: "Name"
                },
                elementType: 'input',
                value: ''
            },
             email: {
                 elementConfig: {
                     type: "email",
                     placeholder: "Email"
                 },
                 elementType: 'input',
                 value: ''
             },
              address: {
                  elementConfig: {
                      type: "textarea",
                      placeholder: "address"
                  },
                  elementType: 'textarea',
                  value: ''
              },
               country: {
                   elementConfig: {
                       options: [
                           {
                               name: 'Nigeria',
                               value: 'nigeria'
                           },
                           {
                               name: "UK",
                               value: 'uk'
                           }
                       ]
                   },
                   elementType: 'select',
                   value: ''
               }
        },
        contactDetails : null
    }
    onChangeHandler = (e, inputId) => {
        const updatedForm = {...this.state.formDetails};
        updatedForm[inputId].value = e.target.value;
        this.setState({
            formDetails: updatedForm
        });
        console.log(this.state.formDetails);
    }
    submitForm = (e) => {
        e.preventDefault();
        let formData = {
            name: this.state.formDetails.name.value,
            address: this.state.formDetails.address.value,
            email: this.state.formDetails.email.value,
            country: 
        }
        console.log(formData);
        // axios.post("https://reactburgerapp-cc275.firebaseio.com/contacts.json", formData)
        //     .then(res => {
        //         console.log(res);
        //     }).catch(error => {
        //         console.log(error);
        //     })
    }
    render(){
        let processedFormElements = [];
        for(let formDetail in this.state.formDetails){
            processedFormElements.push({
                id: formDetail,
                config: this.state.formDetails[formDetail],
                value: this.state.formDetails[formDetail].value
            })
        }
        let formElement = (
             processedFormElements.map(formElement => {
                return (
                        <FormElement key={formElement.id} formElementDetails={formElement} changed={(e) => this.onChangeHandler(event, formElement.id)}/>
                )
            })
        )
        return (
           <form>
               {formElement}
               <Button submitForm={this.submitForm}>Submit</Button>
           </form>
        )
       
    }
   
} 

let FormElement = (props) => {
    let formElement = null;
    switch (props.formElementDetails.config.elementType) {
        case("input"):
            formElement = <input { ...props.formElementDetails.config.elementConfig } value={props.formElementDetails.value} onChange={props.changed}/>
            break;
        case("textarea"):
            formElement = <textarea { ...props.formElementDetails.config.elementConfig } value={props.formElementDetails.value} onChange={props.changed}></textarea>
            break;
        case("select"):
            formElement = 
                <select onChange={props.changed}>
                    {props.formElementDetails.config.elementConfig.options.map(option => {
                            return (
                                <option value={option.value} key={option.value}>{option.name}</option>
                            )
                        })
                    }
                </select>
            break;
        default:
            formElement = null;
    }
    return (
        <div>
            {formElement}
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.submitForm}>{props.children}</button>
    )
}


ReactDOM.render(<App />, document.getElementById('app'));