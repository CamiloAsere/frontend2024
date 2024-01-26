import React, { useState } from 'react';
import Swal from 'sweetalert2';

export const AuthFormSweet = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a cambiar al formulario de ${isLogin ? 'registro' : 'login'}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'No, cancelar'
        });

        if (result.isConfirmed) {
            setIsLogin(!isLogin);
        }
    };

    return (
        <>
            {isLogin ? (
                <div>
                    <h2>Login</h2>
                    {/* Aquí va tu formulario de login */}
                </div>
            ) : (
                <div>
                    <h2>Register</h2>
                    {/* Aquí va tu formulario de registro */}
                </div>
            )}
            <button onClick={handleSwitch}>
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </>
    );
};
