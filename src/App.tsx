import { useRef } from "react"
import { DefaultXRControllers, Hands, VRCanvas } from "@react-three/xr"
import { OrbitControls, Plane, Sky } from "@react-three/drei"
import MovementController from "MovementController"
import VRGDPGraph from 'VRGDPGraph'

function Floor() {
    return (
        <Plane
            args={[10, 10]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            type="Static"
            receiveShadow
        >
            <meshStandardMaterial attach="material" color="#eee" />
        </Plane>
    );
}
export default function App() {
    const divRef = useRef<HTMLDivElement>(null);

    return <div ref={divRef} style={{ height: divRef.current?.clientWidth }}>
        <VRCanvas>
            <Sky sunPosition={[0, 1, 0]} />
            <Floor />
            <VRGDPGraph />
            <DefaultXRControllers />
            <Hands />
            <MovementController />
            <OrbitControls />
            <ambientLight />
            <spotLight
                position={[1, 8, 1]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                castShadow
            />
        </VRCanvas>
    </div>
}
