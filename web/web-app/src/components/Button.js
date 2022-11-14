import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
    }) => {
        return (
            <Link to='/Login' classNameName='btn-mobile'>
                <button
                className="btn_test"
                onClick={onClick}
                type={type}
                >
                     {children}
                </button>

            </Link>
        )
    }