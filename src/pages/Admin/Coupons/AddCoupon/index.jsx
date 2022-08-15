import React from "react";
import "tachyons";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik';
import * as Yup from "yup";
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchWithToken } from "helpers/fetch";
import { endPoints } from "const/endPoints";
import Toast from "components/common/Popup/Toast";
import { ClipLoader } from "react-spinners";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const AddCoupon = ({ addCouponDialog, setCouponDialog, flag }) => {

    const [loading, setLoading] = React.useState(false);
    const { courses } = useSelector((state) => state.courses);
    const titles = courses.map(course => course.title)
    //**** VALIDATION SCHEMA ****/
    const VALIDATION_SCHEMA = Yup.object().shape({
        course: Yup.string().required(),
        name: Yup.string().required(),
        discount: Yup.number().required(),
    });

    const formik = useFormik({
        initialValues: {
            course: '',
            name: '',
            discount: 0
        },
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: async (values) => {
            const courseId = courses.find(c => c.title === values.course)
            values.course = courseId.id
            setLoading(true);
            const resp = await fetchWithToken(endPoints.create_coupon, values, 'POST')
            const data = await resp.json();
            setCouponDialog(false)
            if (data.statusCode == 200) {
                Toast('success', data.message)
            }
            else {
                Toast('error', data.message)
            }
            setLoading(false);
            flag(true)
        },
    });

    return (
        <>
            <Dialog
                open={addCouponDialog}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth={"md"}
                onClose={() => setCouponDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Agregar cupón</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <InputLabel id="demo-multiple-chip-label">Curso al que se le aplicará el título</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="course"
                            name="course"
                            label="Nombre de los cursos"
                            fullWidth
                            value={formik.values.course}
                            onChange={formik.handleChange}
                        >
                            {titles.map((title) => (
                                <MenuItem
                                    key={title}
                                    value={title}
                                >
                                    {title}
                                </MenuItem>
                            ))}
                        </Select>
                        <Stack direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={2}
                            marginTop={4}
                        >
                            <TextField
                                autoFocus
                                margin="normal"
                                fullWidth
                                variant="standard"
                                id="name"
                                name="name"
                                label="Nombre del cupón"
                                type="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                            />
                            <TextField
                                autoFocus
                                margin="normal"
                                fullWidth
                                variant="standard"
                                id="discount"
                                discount="discount"
                                label="Descuento %"
                                type="discount"
                                value={formik.values.discount}
                                onChange={formik.handleChange}
                                error={formik.touched.discount && Boolean(formik.errors.discount)}
                            />
                        </Stack>
                        <Stack direction="row"
                            justifyContent="space-around"
                            alignItems="flex-start"
                            spacing={2}
                            marginTop={5}
                        >
                            <Button onClick={() => setCouponDialog(false)} color="warning" variant="contained" fullWidth>
                                Cancelar
                            </Button>
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Enviar
                                {loading && <ClipLoader color={"white"} size={30} />}
                            </Button>
                        </Stack>

                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default AddCoupon;