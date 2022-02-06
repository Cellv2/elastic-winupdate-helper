import React, { useState } from "react";
import RbButton from "react-bootstrap/Button";
import RbForm from "react-bootstrap/Form";
import RbInputGroup from "react-bootstrap/InputGroup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    getClusterInfoAsync,
    getClusterShardAllocationStateAsync,
    selectClusterNodeStats,
} from "./elasticSlice";

type Props = {};

// TODO: maybe think about expanding this pattern?
// ports range from 0 to 65535, so [0-9]{1,5} should encompass any valid port
const clusterValidationRegex = new RegExp("^https?://.{1,}:[0-9]{1,5}/?");
const isClusterUrlValid = (clusterUrl: string): boolean => {
    return clusterValidationRegex.test(clusterUrl);
};

const ElasticConnectButton = (props: Props) => {
    const clusterInfo = useAppSelector(selectClusterNodeStats);
    const dispatch = useAppDispatch();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [clusterConnectionVal, setClusterConnectionVal] =
        useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            const form = event.currentTarget;

            event.preventDefault(); // we don't want the page reloading

            if (form.checkValidity() === false) {
                setIsFormValid(false);
                event.stopPropagation();
            }

            setIsFormValid(true);
            console.log(clusterConnectionVal);
            if (isClusterUrlValid(clusterConnectionVal)) {
                try {
                    // await getClusterStats(clusterConnectionVal);
                    await dispatch(getClusterInfoAsync(clusterConnectionVal));
                    await dispatch(
                        getClusterShardAllocationStateAsync(
                            clusterConnectionVal
                        )
                    );
                    console.log("connected");
                    console.log("PRINTING THE THINGIES - ", clusterInfo);
                } catch (err) {
                    // TODO: handle error notifications
                    console.error(err);
                }
            } else {
                // TODO: handle error notifications
                // this shouldn't really be possible at this point, but just in case
                console.error("The connection URL was not valid");
            }
        }
    };

    // not the *exact* typing, but it'll do - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
    const handleClusterConnectionInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event) {
            const value = event.target.value;
            setClusterConnectionVal(value);
        }
    };

    return (
        <div
            className="p-2"
            style={{
                background: `repeating-linear-gradient(
            -45deg,
            #bcb360,
            #bcb360 10px,
            #b89603 10px,
            #b89603 20px
          )`,
            }}
        >
            <h1>THIS IS TEMPORARY</h1>
            <RbForm
                noValidate
                validated={isFormValid}
                onSubmit={async (e) => await handleSubmit(e)}
            >
                <RbForm.Group
                    className="mb-3"
                    controlId="validationClusterConnection"
                >
                    <RbForm.Label>Cluster Connection</RbForm.Label>
                    <RbInputGroup hasValidation>
                        <RbForm.Control
                            type="text"
                            placeholder="http://cluster:port"
                            required
                            onChange={handleClusterConnectionInputChange}
                            pattern={`${clusterValidationRegex.source}`}
                            className="w-100"
                        />
                        <RbForm.Control.Feedback type="invalid">
                            Please ensure the url starts with http:// or
                            https:// and ends with a port
                        </RbForm.Control.Feedback>
                    </RbInputGroup>
                </RbForm.Group>

                <RbButton variant="primary" type="submit">
                    Connect
                </RbButton>
            </RbForm>
        </div>
    );
};

export default ElasticConnectButton;
