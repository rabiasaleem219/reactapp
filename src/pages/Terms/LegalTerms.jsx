import React from "react";
import { BackgroundNavbar } from '../../components/common/BackgroundNavbar';
import { MenuBar } from '../../components/common/MenuBar';
import Resize from '../../helpers/Resize';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography'
import { Button } from "@mui/material";

const LegalTerms = () => {
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
                    CONDICIONES DE USO DEL CAMPUS VIRTUAL
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    1- Información General
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    CENTRO CIENTÍFICO NACIONAL DE OZONO. con RIF: G-200162651- Domicilio
                    fiscal Sector Alta Florida. Caracas. Distrito Capital, específicamente el Departamento de
                    Docencia e Investigación (en adelante, “CENAOZ DOCENCIA”) es titular de la plataforma
                    de formación disponible en https://www.cenaoz.com/campus (en adelante, el “Campus
                    Virtual”).
                    <br /> <br />
                    Las presentes Condiciones de uso del campus Virtual (en adelante, las “Condiciones”)
                    regirán uso del Campus Virtual por parte de aquellas personas que se hayan matriculado en
                    alguno de los cursos ofrecidos por CENAOZ DOCENCIA, en todo lo relativo a su uso,
                    acceso y navegación del Campus Virtual (en adelante, los “Estudiantes” colectivamente o;
                    el “Estudiante” individualmente).
                    <br /> <br />
                    Las presentes Condiciones son complementarias a las Condiciones Generales de
                    Contratación aceptadas por el Estudiante en el proceso de matriculación y, por tanto, su
                    aplicación quedará supeditada a la efectiva vigencia de la relación existente entre el
                    Estudiante y CENAOZ DOCENCIA
                    <br /> <br />
                    Al mismo tiempo, se informa a los Usuarios que para acceder al Campus Virtual es
                    necesario haber leído y aceptado las presentes Condiciones, prestando su consentimiento
                    marcando la casilla de aceptación correspondiente.
                    <br /> <br />
                    Si los Estudiantes desean contactar con CENAOZ DOCENCIA para cualquier duda o
                    incidencia, puede utilizar la siguiente dirección de correo
                    electrónico cenaoz.docencia@gmail.com o contactar a través del número de teléfono +58
                    212 730 6066 de lunes a viernes y en horario de 8 am a 3 pm.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    2- Registro en el Campus Virtual
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    Todos los cursos ofrecidos por CENAOZ DOCENCIA se cursarán en formato digital a
                    través del Campus Virtual, por tanto, para disfrutar del servicio, esto es, cursar o estudio en
                    el que el Estudiante se haya matriculado, el Estudiante deberá acceder al Campus Virtual
                    disponible en el apartado “acceso a campus” de la Página Web de CENAOZ DOCENCIA y
                    registrase utilizando las credenciales facilitadas por correo electrónico.
                    <br /> <br />
                    El registro en el Campus Virtual será completamente gratuito, salvo en lo relativo al coste
                    del estudio y al coste relativo a la conexión a través de la red de telecomunicaciones  suministrada por el proveedor de acceso contratado por el Estudiante.
                    <br /> <br />
                    Una vez completado el registro, el Estudiante deberá confirmar los datos personales
                    (identificativos y de contacto) facilitados en el proceso de matriculación y, en caso de ser
                    necesario, podrá modificar aquellos que considere oportuno.
                    <br /> <br />
                    El uso del Campus Virtual y, por ende, el acceso al material y contenido formativo (libros,
                    videos, esquemas, imágenes, etc.) a disposición de los Estudiantes, es personal e
                    intransferible y, por tanto, queda prohibido el acceso o puesta a disposición en favor de
                    terceros.
                    <br /> <br />
                    El Estudiante se compromete a que la contraseña elegida durante este proceso de registro en
                    la Plataforma será personal e intransferible, no estando permitida su cesión, ni siquiera de
                    forma temporal, a terceros. En tal sentido, el Estudiante se compromete a hacer un uso
                    diligente y a mantener en secreto la contraseña utilizada para acceder al Campus Virtual.
                    En el caso de la pérdida, robo o uso de su contraseña por terceros, deberá poner tal
                    circunstancia en conocimiento de CENAOZ DOCENCIA.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    3- Requisitos de acceso y uso al Campus Virtual
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    El registro y uso del Campus Virtual estarán limitados exclusivamente a los Estudiantes
                    mayores de 18 años, con capacidad jurídica plena. Todos los recursos del Campus Virtual
                    se encuentran integrados y su acceso es a través de un navegador de Internet, por ello, no
                    será necesario instalar ningún software adicional en el dispositivo utilizado por el
                    Estudiante. El Estudiante podrá disfrutar del uso del Campus Virtual y del acceso a los
                    materiales y contenidos formativos durante el plazo o duración del Estudio en el que se
                    haya matriculado.
                    <br /> <br />
                    Para poder cursar los Estudios íntegramente, los Estudiantes disponen de las siguientes
                    opciones:
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'} >-Windows: Internet Explorer 6 y posteriores, Firefox 1.x y posteriores, Google Chrome
                        -Opera 9.5 y posteriores.</Typography>
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>-Mac: Safari 3 y posteriores, Firefox 1.x y posteriores, Google Chrome.</Typography>
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>-Linux: Firefox 1.x y posteriores.</Typography>
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>-Android</Typography>
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>-Apple iOSar de la normativa en materia de protección de datos</Typography>
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    4- Responsabilidad de los Estudiantes
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    El Estudiante reconoce y acepta que acceso y uso del Campus Virtual, tiene lugar libre y
                    conscientemente, bajo su exclusiva responsabilidad. El Estudiante se compromete a hacer
                    un uso adecuado y lícito del Campus Virtual.
                    <br /> <br />
                    El Estudiante deberá abstenerse de (i) hacer un uso no autorizado o fraudulento del Campus
                    Virtual; (ii) acceder o intentar acceder a recursos restringidos del Campus Virtual; (iii)
                    utilizar el Campus Virtual con fines o efectos ilícitos, ilegales, contrarios a lo establecido en
                    las presentes Condiciones, lesivos de los derechos e intereses de terceros, o que de
                    cualquier forma puedan dañar, inutilizar o sobrecargar o impedir la normal utilización o
                    disfrute del Campus Virtual; (iv) provocar daños en el Campus Virtual, otros usuarios o de
                    terceros; (v) introducir o difundir virus informáticos o cualesquiera otros sistemas físicos o
                    lógicos que sean susceptibles de provocar daños en los sistemas de CENAOZ DOCENCIA,
                    de sus proveedores, otros usuarios o de terceros, (vi) intentar acceder, utilizar y/o manipular
                    los datos de CENAOZ DOCENCIA, terceros proveedores y/u otros Estudiantes; (vii)
                    reproducir, copiar, distribuir, transformar o modificar los Contenidos, permitir el acceso a
                    terceros a través de cualquier modalidad de comunicación pública, a menos que se cuente
                    con la autorización del titular de los correspondientes derechos o ello este ́ legalmente
                    permitido; (viii) obtener o intentar obtener los contenidos disponibles en el Campus Virtual
                    empleando para ello medios o procedimientos distintos de los que, según los casos, se
                    hayan puesto a su disposición a este efecto por parte de CENAOZ DOCENCIA; (ix)
                    Abstenerse de facilitar cualquier material o contenido sujeto a derechos de autor, marcas
                    comerciales, patentes y el resto de los derechos de propiedad intelectual e industrial del que
                    no ostente legitimación suficiente para su utilización tanto por él mismo como por el resto
                    de Estudiantes, así como para que dicha utilización no vulnere ninguna previsión legal,
                    contrato, derecho o propiedad de terceros, ni de ningún modo constituya competencia
                    desleal.
                    <br /> <br />
                    En caso de incumplimiento por parte del Estudiante de las presentes Condiciones, incluso
                    ante la mera sospecha, o en caso de uso ilegal o ilícito del Campus Virtual, CENAOZ
                    DOCENCIA se reserva el derecho a suspender, modificar, restringir o interrumpir, ya sea
                    temporal o permanentemente, el acceso, navegación, uso, alojamiento y/o descarga del
                    contenido y/o uso del Campus Virtual, con o sin previa notificación, sin que medie la
                    posibilidad del Estudiante de exigir indemnización alguna por esta causa. Así como a
                    emprender las acciones legales que considere oportunas para proteger sus derechos.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    5- Responsabilidad
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    CENAOZ DOCENCIA no se hace responsable, directa e indirectamente, de las
                    reclamaciones efectuadas por los Estudiantes que tengan causa en alguna de la de las
                    siguientes circunstancias:
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                        • Uso incorrecto del Portal: CENAOZ DOCENCIA ha creado su Campus Virtual
                        para la prestación de sus servicios educativos, no siendo responsable por el uso incorrecto, ilícito o negligente que pudiere hacer el Estudiante. Igualmente,
                        CENAOZ DOCENCIA no será responsable de los daños de cualquier naturaleza
                        que se deriven de problemas de acceso a Internet, problemas tecnológicos, daños
                        ocasionados por la falta de resolución de los dispositivos utilizados por el
                        Estudiante, problemas relacionados con el navegador u otros de esta índole; y daños
                        ocasionados por el Estudiante o por errores en la información suministrada por éste.
                    </Typography>
                    <br></br>
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                        • Utilización de los contenidos: CENAOZ DOCENCIA facilita todos los contenidos
                        del Campus Virtual, bajo determinadas condiciones, y de buena fe, y realizará sus
                        mejores esfuerzos para que los mismos estén permanentemente actualizados y
                        vigentes; no obstante, CENAOZ DOCENCIA no puede asumir responsabilidad
                        alguna respecto al uso o acceso que realicen los Estudiantes fuera del ámbito al que
                        se dirige, cuya responsabilidad final recaerá sobre el Estudiante. Asimismo,
                        CENAOZ DOCENCIA no va a poder controlar los contenidos que no hayan sido
                        elaborados por ella o por terceros cumpliendo su encargo y, por tanto, no
                        responderá en ningún caso de los daños, contenidos e indisponibilidades técnicas
                        que pudieran causarse por parte de dichos terceros.
                    </Typography>
                    <br></br>
                    <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                        • Virus: CENAOZ DOCENCIA no puede asegurar totalmente la ausencia de virus,
                        gusanos, caballos de Troya y elementos similares en su Campus Virtual y otros
                        elementos nocivos. En consecuencia, CENAOZ DOCENCIA no será responsable
                        de los daños que los mismos pudieran producir al usuario
                        • Fallos tecnológicos: CENAOZ DOCENCIA no garantiza la ausencia de fallos
                        tecnológicos, ni la permanente disponibilidad del Campus Virtual y de las distintas
                        funcionalidades incluidas en éste y, en consecuencia, no asume responsabilidad
                        alguna por los daños y perjuicios que puedan generarse por la falta de
                        disponibilidad y por los fallos en el acceso ocasionados por desconexiones, averías,
                        sobrecargas o caídas de la red no imputables a CENAOZ DOCENCIA.
                    </Typography>
                    <br></br>
                    Sin perjuicio de lo anterior, CENAOZ DOCENCIA declara que ha adoptado todas las
                    medidas necesarias, dentro de sus posibilidades y del estado de la técnica, para garantizar el
                    correcto funcionamiento del Campus Virtual y reducir al mínimo los errores del sistema,
                    tanto desde el punto de vista técnico como de los contenidos publicados.
                    <br></br>
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    6- Enlaces a otras páginas web: Materiales Complementarios
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    A través del apartado “Materiales Complementarios” del Campus Virtual, CENAOZ
                    DOCENCIA facilita a los Estudiantes el acceso a contenido e información adicional
                    relacionada con el Estudio cursado, lo que incluye, enlaces a páginas web que considera de
                    interés para los Estudiantes. El objetivo de dichos enlaces es únicamente facilitar la
                    búsqueda de los recursos que puedan interesar a los Estudiantes a través de Internet. No
                    obstante, dichas páginas no le pertenecen, ni hace una revisión de sus contenidos y, porello, no puede hacerse responsable de los mismos, del funcionamiento de la página
                    enlazada o de los posibles daños que puedan derivarse del acceso o uso de la misma.
                    <br /><br />
                    Asimismo, CENAOZ DOCENCIA se muestra plenamente respetuosa con los derechos de
                    propiedad intelectual o industrial que les puedan corresponder, a terceras personas, sobre
                    las páginas web a las que se refieran los citados enlaces.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    7- Establecimiento de enlaces con el Campus Virtual
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    Con carácter general no se autoriza el establecimiento de enlaces de hipertexto (en adelante,
                    “link” o “links”) con destino al Campus Virtual.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    8- Frames o marcos
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    CENAOZ DOCENCIA prohíbe expresamente la realización de “framings” o la utilización
                    por parte de terceros de cualesquiera otros mecanismos que alteren el diseño, configuración
                    original o contenidos del Campus Virtual.
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    9- Derechos de Propiedad Intelectual e Industrial
                </Typography>
                <Typography paddingLeft={12} variant="body1" gutterBottom component={'div'}>
                    Todos los derechos de autor, marcas comerciales, patentes y el resto de los derechos de
                    propiedad intelectual e industrial referentes al material o contenido disponible en el
                    Campus Virtual y/o necesarias para el correcto funcionamiento y gestión de la misma,
                    incluyendo software, datos, información, texto, fotografías, música, sonido, vídeos,
                    gráficos, logotipos, símbolos, trabajos artísticos y cualquier otro tipo de material o
                    imágenes, son propiedad de CENAOZ DOCENCIA o se le han cedido bajo licencia
                    mediante los derechos de autor(es) para su uso. Por lo que su uso, reproducción,
                    distribución, comunicación pública, transformación o cualquier otra actividad similar o
                    análoga, queda totalmente prohibida salvo que medie expresa autorización por escrito de
                    CENAOZ DOCENCIA.
                    <br /> <br />
                    Asimismo, queda estrictamente prohibida la utilización de todos los elementos objeto de
                    propiedad industrial y/o intelectual del Campus Virtual con fines comerciales, así como su
                    distribución, modificación, alteración o descompilación. En ningún momento, salvo
                    manifestación expresa en contrario, el acceso, navegación o utilización del Campus Virtual
                    y/o de sus contenidos confiere al Estudiante derecho alguno sobre signos distintivos en
                    éstos incluidos.
                    <br /> <br />
                    En el caso de que el Estudiante envíe información de cualquier tipo a CENAOZ
                    DOCENCIA a través de cualquiera de los canales habilitados al efecto, el Estudiante
                    declara, garantiza y acepta que tiene derecho a hacerlo libremente, que dicha información
                    no infringe ningún derecho de propiedad intelectual e industrial, de marcas, de patentes,
                    secreto comercial o cualesquiera otros derechos de terceros, y que dicha información no
                    tiene carácter confidencial ni es perjudicial para terceros.
                    <br /> <br />
                    En todo caso, CENAOZ DOCENCIA declara su respeto a los derechos de propiedad
                    intelectual e industrial de terceros; por ello, si el Estudiante considera que este sitio pudiera
                    estar violando sus derechos o los de terceros, rogamos se ponga en contacto con CENAOZ
                    DOCENCIA en la siguiente dirección de e-mail: cenaoz.docencia@gmail.com
                </Typography>
                <Typography fontWeight={"bold"} paddingLeft={6} variant="h5" gutterBottom component="div">
                    10- Modificación y vigencia de las Condiciones
                </Typography>
                <Typography paddingLeft={12} component={'div'} variant="body1" gutterBottom>
                    Las presentes Condiciones se mantendrán vigentes hasta el momento en que el Estudiante
                    finalice el Estudio cursado por cualquiera de los motivos estipulados en las Condiciones
                    Generales, aceptadas por el Estudiante en el proceso de matriculación y puestas a su
                    disposición junto con la confirmación del contrato celebrado.
                    <br /> <br />
                    CENAOZ DOCENCIA se reserva el derecho a llevar a cabo modificaciones y/o
                    actualizaciones en los presentes Condiciones, así como en la presentación y/o configuración
                    del Campus Virtual, de las que se informará previamente al Estudiante para su aceptación o
                    rechazo en caso de resultar sustanciales. En cualquier caso, se considerará que el Estudiante
                    acepta expresamente dichas modificaciones o actualizaciones si realiza un nuevo acceso,
                    navegación o uso del Campus Virtual.
                </Typography>
                <Typography fontWeight={"bold"} component={'div'} paddingLeft={6} variant="h5" gutterBottom >
                    11- Información adicional
                </Typography>
                <Typography paddingLeft={12} component={'div'} variant="body1" gutterBottom>
                    Para más información podrá contactar con atención al cliente de CENAOZ utilizando los
                    datos de contacto que constan en el apartado “Contacta” de la Página Web de CENAOZ.
                    <br /> <br />
                    <Typography textAlign={'center'} component={'div'} color={"darkBlue"}> © 2022 Centro Científico Nacional de Ozono RIF: G-200162651 Todos los derechos reservados. Última actualización: Febrero del 2022.</Typography>
                </Typography>
            </div>
        </>
    );
};

export default LegalTerms;