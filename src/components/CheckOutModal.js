import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CheckoutModal({ submit, setSubmit, setVisibility }) {
    const classes = useStyles();

    const handleClose = () => {
        event.stopPropagation();
        event.preventDefault();
        setSubmit(false);
        setVisibility(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={submit}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={submit}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Thank you!</h2>
                        <p id="transition-modal-description">
                            Your order has been submitted successfully and is
                            being processed! We will notify you when it has been
                            shipped.
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
