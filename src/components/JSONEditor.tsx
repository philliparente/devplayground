import React, { ReactNode } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';


interface JSONEditorProps {
    value: string;
    onChange: (value: string) => void;
    errors: string[]
}

export class JSONEditor extends React.Component<JSONEditorProps> {

    static defaultProps = {
        value: '',
        errors: []
    }

    onValueChange(value: string): void{
        this.props.onChange(value);
    }

    render(): ReactNode {
        const lines = this.props.value.split(/\r\n|\r|\n/).length
        const errorList = this.props.errors.map((e) => {
            return (<li className="collection-item help-text red-text text-darken-2">{e}</li>)
        });
        return (
            <div>
                <CodeMirror
                    value={this.props.value}
                    height={`${lines * 23}px`}
                    extensions={[json()]}
                    onChange={(value) => this.onValueChange(value)} 
                />
                {this.props.errors.length !== 0 &&
                    <div>
                        
                    <ul className="collection with-header">
                        <li className="collection-header red text-lighten-5"><h6 className="white-text text-lighten-5">Errors</h6></li>
                            {errorList}
                        </ul>
                    </div>
                }
                
            </div>
            

        )
    }
}