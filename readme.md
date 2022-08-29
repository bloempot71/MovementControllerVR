# A ReactXR movement controller for VR

## Goal

A drop in component to enable the more or less standard way to controle movement in VR.

Left controller stick, forward/backward/left/wight: move the player forwards and backwards and sideways

Left controller stick, forward/backward: look down/up, left/right: look left/right

## Usage

Just drop  the MovementController in and it should work. So:

    <VRCanvas>
        <Sky sunPosition={[0, 1, 0]} />
        <DefaultXRControllers />
        <Hands />
        <MovementController />
        <OrbitControls />
        <Plane
            args={[10, 10]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            type="Static"
            receiveShadow
        >
            <meshStandardMaterial attach="material" color="#eee" />
        </Plane>
        <ambientLight />
        <spotLight
            position={[1, 8, 1]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
        />
    </VRCanvas>


## Issues

As long as you don't rotate the camera/player it works ok. But rotate the player and the horizontal movement sticks to the woprld axis, instead of the camera axis.

## credits

Based on: https://gist.github.com/mwmwmw/7d8b1d55f8932577e8d96e808edba3b8
