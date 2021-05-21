import React from 'react'
import { gql, useSubscription } from '@apollo/client';

const CREATE_CHILD_SUBSCRIPTION = gql`
      subscription createChild($name: String!, $fname: String!, $age: Int!) {
        createChild(
            name:  $name,
            fname: $fname,
            age: $age
        ){
            id
            name
            age
        }
    }
    `;

function Subscription() {

    const { data, error, loading } = useSubscription(CREATE_CHILD_SUBSCRIPTION);

    if (!loading) {
        console.log("subscription data", data)
    }
    return (
        <div>
            <h4>New Child: </h4>
        </div>
    )

}

export default Subscription
