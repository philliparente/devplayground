import React, { ReactNode } from 'react';
import { Type as AvroType } from 'avsc';
import { JSONEditor } from '../components/JSONEditor';

interface ValidationPageProps {}
interface ValidationPageState {
  schemaDefinition: string;
  schemaValue: string;

  schemaDefinitionErrors: string[];
  schemaValueErrors: string[];

  parsedSchemaDefinition: AvroType
}

const DEFAULT_SCHEMA_DEFINITION: Record<string, any> = {
  type: "record",
  name: "Book",
  fields: [
    {
      name: "title", 
      type: "string"
    },
    {
      name: "author",
      type: {
        name: "Author",
        type: "record",
        fields: [
          {
            name: "name",
            type: "string"
          },
          {
            name: "shortName",
            type: "string"
          },
        ]
      }
      
    },
    {
      name: "kind",
      type: {
        type: "enum", 
        name: "BookKind", 
        symbols: [
          "EBOOK", 
          "COMMON_COVER"
        ]
      }
    },
    {
      name: "categories",
      type: {
        name: "categories_list",
        type: "array",
        items : "string",
        default: []
      }
    }
  ]
}

const DEFAULT_SCHEMA_VALUE = {
  title: "The Lord of Rings",
  kind: "COMMON_COVER",
  author: {
    name: "John Ronald Reuel Tolkien",
    shortName: "J.R.R. TOLKIEN"
  },
  categories: [
    "FICTION",
    "BEST_SELLERS"
  ]
}

const DEFAULT_FORMAT = (value: Record<string, any>) => JSON.stringify(value, null, 2);

export default class ValidationPage extends React.Component<ValidationPageProps, ValidationPageState> {

  constructor(props: ValidationPageProps){
    super(props);
    this.state = {
      schemaDefinition: DEFAULT_FORMAT(DEFAULT_SCHEMA_DEFINITION),
      schemaDefinitionErrors: [],
      schemaValue: DEFAULT_FORMAT(DEFAULT_SCHEMA_VALUE),
      schemaValueErrors: [],
      parsedSchemaDefinition: AvroType.forSchema(DEFAULT_SCHEMA_DEFINITION as AvroType),
    }
  
    
  }

  listenToChange(value: string): void {
    const jsonValue  = JSON.parse(value);
    const schema = AvroType.forSchema(jsonValue);
    
    console.log(jsonValue);
    console.log(schema);
  }


  schemaDefinitionChangeHandler(value: string) {
    let parsedValue = {};
    const definitionErrors = [];
    let isJSONValid = true;
    let schema: null | AvroType = null;
    try{
      parsedValue = JSON.parse(value || '{}')
    } catch(e){
        isJSONValid = false;
        definitionErrors.push('JSON is not valid');
        parsedValue = {};
    }
     if(isJSONValid){
      try{
        schema = AvroType.forSchema(parsedValue as AvroType);
      }catch(e){
        definitionErrors.push(String(e));
      }
     } 

    
     this.setState({
      schemaDefinition: value, 
      schemaDefinitionErrors: definitionErrors, 
      parsedSchemaDefinition: schema as AvroType
    }, () => {
      this.schemaValueChangeHandler(this.state.schemaValue);
    });
    
  }

  schemaValueChangeHandler(value: string) {

    let parsedValue = {};
    const valueErrors = [];
    let isJSONValid = true;
    try{
      parsedValue = JSON.parse(value || '{}')
    } catch(e){
        isJSONValid = false;
        valueErrors.push('JSON is not valid');
        parsedValue = {};
    }

    if(isJSONValid && this.state.parsedSchemaDefinition){
      this.state.parsedSchemaDefinition.isValid(parsedValue, {
        noUndeclaredFields: true,
        errorHook: (path: string[], val, type) => {
            if(path.length === 0){
              valueErrors.push(`Unexpected field for ${type}`);
              return;
            }
            valueErrors.push(`Unexpected value given for field "${path}": Received: ${val} (${typeof val}), expected: ${type}`);
          }
      });
    }

    this.setState({schemaValue: value, schemaValueErrors: valueErrors})
  }

  render()  : ReactNode {
    const {schemaDefinition, schemaValue} = this.state;
    return (
      <div>
        <div className="row">
        <h1 className="teal-text text-darken-3">Avro schema validation</h1>
        <hr className="teal-text text-darken-3" />
        <p>
          An <a href="https://avro.apache.org/docs/1.10.2/spec.html">Avro schema</a> and value validation powered by
          <a href="https://github.com/mtth/avsc"> mtth/avsc lib</a>. 
          Sometimes, is tedious to validate Avro schemas and values from it without setup an environment fot it. This section aims to provide a flexible way to fast validate Avro schemas and values easily.
        </p>
        </div>
        <div className="row">
          <div className="col s12 l5 z-depth-1">
            <h5>Edit schema to validate it.   
              {this.state.schemaDefinitionErrors.length !== 0 &&
                <span data-badge-caption="Errors" className="new badge red">{this.state.schemaDefinitionErrors.length}</span>  
              }
              
            </h5>
            <hr className="teal-text text-darken-3" />
            <JSONEditor 
              errors={this.state.schemaDefinitionErrors}
              value={schemaDefinition} 
              onChange={(value:string) => this.schemaDefinitionChangeHandler(value)} 
            />
            
          </div>
          <div className="col s12 l2">
          <div className="center-align">
            
            <i className="material-icons large teal-text text-darken-3">arrow_forward</i>
          </div>
          </div>
          <div className="col s12 l5 z-depth-1">
          <h5>Edit value to match schema structure.
          {this.state.schemaValueErrors.length !== 0 &&
                <span data-badge-caption="Errors" className="new badge red">{this.state.schemaValueErrors.length}</span>  
              }

          </h5>
          <hr className="teal-text text-darken-3" />
            <JSONEditor 
              value={schemaValue} 
              onChange={(value:string) => this.schemaValueChangeHandler(value)} 
              errors={this.state.schemaValueErrors}
            />
          </div>
        </div>
      </div>
      
    
    )
  }
}
