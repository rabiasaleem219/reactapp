import React from "react";
import Typography from '@mui/material/Typography'
import { BackgroundNavbar } from '../../components/common/BackgroundNavbar';
import { MenuBar } from '../../components/common/MenuBar';
import Resize from '../../helpers/Resize';
import { useSelector } from 'react-redux';
import { Button } from "@mui/material";

const TermsConditions = () => {
    const width = Resize();
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            <BackgroundNavbar />
            <div>
                {user && width > 920 ? <MenuBar /> : null}

                <br />
                <br />
                <br />
                <Typography paddingLeft={3} variant="h4" gutterBottom component="div">
                    POLÍTICA DE PRIVACIDAD
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    1- Introducción
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    Esta política de protección de datos personales (la “Política de Privacidad”) informa a los
                    usuarios de la página web www.cenaoz.com (la “Web”) sobre el tratamiento de sus datos
                    personales. Se considera dato personal toda información sobre una persona física
                    identificada o identificable a través de la cual pueda determinarse, directa o indirectamente,
                    la identidad de una persona. El nombre de una persona, el número de teléfono o la dirección
                    de correo electrónico pueden considerarse datos personales.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    2- Responsable del tratamiento
                </Typography>
                <Typography paddingLeft={12} variant="body1" component={'div'} gutterBottom>
                    CENTRO CIENTIFICO NACIONAL DE OZONO RIF: G-20016265, domicilio fiscal:
                    Sector Alta Florida. Caracas. Distrito Capital. Es el responsable del tratamiento de los datos
                    personales que se recojan a través de la Web o que se generen por su uso. Puede contactar
                    con CENAOZ a través de cualquiera de los siguientes medios de contacto:
                    <Typography paddingLeft={6} variant="body1" component={'div'} gutterBottom>
                        • Domicilio: Sector Alta Florida. Caracas. Distrito Capital
                    </Typography>
                    <Typography paddingLeft={6} variant="body1" component={'div'} gutterBottom>
                        • Dirección de correo electrónico: cenaoz.docencia@gmail.com
                    </Typography>
                    <Typography paddingLeft={6} variant="body1" component={'div'} gutterBottom>
                        • Teléfono: 58+ (0212) 730 60 66
                    </Typography>
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    3- Conservación de los datos personales
                </Typography>
                <Typography paddingLeft={12} variant="body1" component={'div'} gutterBottom>
                    Los datos personales serán conservados durante el tiempo necesario para atender a la
                    finalidad para los que son tratados. En este sentido:
                    <Typography paddingLeft={6} variant="body1" component={'div'} gutterBottom>
                        • Los datos proporcionados para solicitudes de contacto serán tratados durante el
                        tiempo necesario para gestionar su solicitud o petición de información.
                    </Typography>
                    <Typography paddingLeft={6} variant="body1" component={'div'} gutterBottom>
                        • Los datos proporcionados para remitirle comunicaciones comerciales serán tratados
                        hasta que el usuario no solicite su baja en la recepción de dichas comunicaciones
                        comerciales.
                    </Typography>
                    <Typography paddingLeft={6} variant="body1" component={'div'} gutterBottom>
                        • Los datos proporcionados por los estudiantes serán tratados durante la realización
                        del curso y, tras ello, durante el plazo requerido para cumplir con las obligaciones
                        de conservación de documentación establecidas en la normativa aplicable.
                    </Typography>
                    Tras ello, los datos serán conservados durante el periodo de tiempo necesario para atender
                    cualquier tipo de responsabilidad (p.ej., hasta la prescripción de la responsabilidad que
                    pudiera derivar de la normativa en materia de protección de datos).
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    4- Exactitud y veracidad de los datos
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    El usuario garantiza que todos los datos personales facilitados a través de la Web son
                    veraces, exactos y actualizados, comprometiéndose a comunicar a CENAOZ DOCENCIA
                    cualquier alteración o modificación. El usuario será el único responsable de la inexactitud o
                    falsedad de los datos proporcionados.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    5- Datos de terceros
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    En el caso de que el usuario proporcione datos de terceros, este se compromete a haber
                    obtenido su consentimiento previo e informado -salvo que resulte de aplicación alguna otra
                    causa que legitime dicha comunicación-. El consentimiento será considerado como
                    informado cuando los terceros hayan sido informados por el usuario y hayan aceptado esta
                    Política de Privacidad. Es responsabilidad única del usuario cumplir con el deber de
                    información indicado y haber obtenido los consentimientos previos de los terceros sin que
                    deba realizar ninguna actuación adicional frente a estos.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    6- Cookies
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    La Web utiliza “cookies” (ficheros que se descargan en el ordenador/smartphone/tablet del
                    usuario al acceder a determinadas páginas web para almacenar y recuperar información
                    sobre la navegación que se efectúa desde dicho equipo).
                    <br /> <br />
                    <Typography textAlign={"center"} color={"darkblue"} component={'div'}> © 2022 Centro Científico Nacional de Ozono RIF: G-200162651 Todos los derechos reservados. Última actualización: Febrero del 2022.</Typography>
                </Typography>
            </div>
        </>
    );
};

export default TermsConditions;