import React, { ReactNode } from "react"


export default class IndexPage extends React.Component{

    render(): ReactNode{
        return (
            <div>
                <h1 className="teal-text text-darken-3">DevPlayground</h1>
                <hr />
                <p>A set of development tools to help our daily lives</p>
                <div className="row">
                    <div className="col s12 l12">
                    <ul className="collection">
                        <li className="collection-item"><a href="/validate-avro-schema">Avro schema validator</a>: An Avro schema validator to help devs to define schemas</li>
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}