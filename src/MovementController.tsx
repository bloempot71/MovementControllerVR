import { useXR, useController } from "@react-three/xr";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

// TODO: something is right with the movement after rotation

export default function MovementController({
    horizontalSensitivity = 0.05,
    forwardSensistivity = 0.05,
    rotationSensitivity = 0.05,
    deadzone = 0.05,
    horizontalAxis = 2,
    forwardAxis = 3,
    rotationAxis = 2
}) {
    const { player } = useXR();
    const rightController = useController("right");
    const leftController = useController("left");
    var forward = new Vector3();
    var horizontal = new Vector3();

    useFrame(() => {
        if (
            rightController?.inputSource.gamepad &&
            leftController?.inputSource.gamepad &&
            player
        ) {
            const axesRight = rightController.inputSource.gamepad.axes;
            const axesLeft = leftController.inputSource.gamepad.axes;
            const camera = player.children[0];
            const cameraMatrix = camera.matrixWorld.elements;

            forward
                .set(-cameraMatrix[8], -cameraMatrix[9], -cameraMatrix[10])
                .normalize();

            forward.y = 0;
            horizontal.copy(forward);
            horizontal.cross(camera.up).normalize();

            player.rotation.y -=
                (Math.abs(axesRight[rotationAxis]) > deadzone
                    ? axesRight[rotationAxis]
                    : 0) * rotationSensitivity;

            player.position.add(
                horizontal.multiplyScalar(
                    (Math.abs(axesLeft[horizontalAxis]) > deadzone
                        ? axesLeft[horizontalAxis]
                        : 0) * horizontalSensitivity
                )
            );
            player.position.add(
                forward.multiplyScalar(
                    (Math.abs(axesLeft[forwardAxis]) > deadzone
                        ? -axesLeft[forwardAxis]
                        : 0) * forwardSensistivity
                )
            );
        }
    });
    return <></>;
}
