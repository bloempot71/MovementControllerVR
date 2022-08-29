import { useEffect, useMemo, useState } from "react"
import { gdpData } from "gdp"
import * as THREE from "three"

function Bar(props: {
    position: THREE.Vector3;
    height: number;
    material?: THREE.Material;
}) {
    return (
        <mesh
            position={
                new THREE.Vector3(
                    props.position.x,
                    props.position.y + props.height / 2,
                    props.position.z
                )
            }
            material={props.material}
        >
            <boxGeometry args={[0.1, props.height, 0.1]} />
        </mesh>
    );
}


export default function VRGDPGraph() {
    const center = useMemo(() => [-2, 0, -1.5], []);
    const startYear = 1990;
    const [graphData, setGraphData] = useState<THREE.Vector3[]>();
    const [maxGDP, setMaxGDP] = useState(0);

    useEffect(() => {
        const europe = [
            "AUT",
            "BEL",
            "BGR",
            "CHE",
            "CYP",
            "CZE",
            "DEU",
            "DNK",
            "ESP",
            "EST",
            "FIN",
            "FRA",
            "GBR",
            "GEO",
            "GRC",
            "HRV",
            "HUN",
            "IRL",
            "ISL",
            "ITA",
            "LTU",
            "LUX",
            "LVA",
            "MLT",
            "NLD",
            "NOR",
            "POL",
            "PRT",
            "ROU",
            "SRB",
            "SVK",
            "SVN",
            "SWE",
            "TUR"
        ];
        (async function () {
            const countries = europe; //gdpData.map(d => d.LOCATION).filter((d, index, self) => self.indexOf(d) === index)
            const data = gdpData
                .filter((d) => europe.includes(d.LOCATION))
                .filter((d) => d.TIME > startYear)
                .map(
                    (d) =>
                        new THREE.Vector3(
                            center[0] + (d.TIME - startYear) / 5,
                            d.Value / 10000,
                            center[2] + countries.indexOf(d.LOCATION) / 10
                        )
                );
            const _maxGDP = data.reduce((acc, value) =>
                value.y < acc.y ? acc : value
            );
            setGraphData(data);
            setMaxGDP(_maxGDP.y);

            console.log("data", data, _maxGDP);
        })();
    }, [center]);

    return <>
        {graphData?.map((d, index) => (
            <Bar
                key={index}
                position={new THREE.Vector3(d.x, center[1], d.z)}
                height={d.y}
                material={
                    new THREE.MeshPhongMaterial({
                        color: new THREE.Color(d.y / maxGDP, 0, 0.2)
                    })
                }
            />
        ))}
    </>
}