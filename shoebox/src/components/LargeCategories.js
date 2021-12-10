import React from 'react'
import styled from 'styled-components'

const LargeCategories = () => {
    return (
        <div className='container'>
            <div className='row g-0'>
                <div className='col-6 text-center'>
                    <Jumbotron className='jumbotron jumbotron-fluid'>
                        <h3>Men's</h3>
                    </Jumbotron>
                </div>
                <div className='col-6 text-center'>
                    <Jumbotron className='jumbotron jumbotron-fluid'>
                        <h3>Women's</h3>
                    </Jumbotron>
                </div>
            </div>
        </div>
    )
}

export default LargeCategories;

const Jumbotron = styled.div`
background: url('https://cdn.lookastic.com/looks/long-sleeve-shirt-crew-neck-t-shirt-jeans-large-64197.jpg')
`