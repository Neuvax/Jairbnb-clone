'use client';

import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { 
    GiBarn, 
    GiBoatFishing, 
    GiCactus, 
    GiCastle, 
    GiCaveEntrance, 
    GiForestCamp, 
    GiIsland, 
    GiWindmill } from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Beachfront",
        icon: TbBeach,
        description: "This property is located on the beachfront."
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has windmills."
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property arquitecture is modern."
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property is located in the countryside."
    },
    {
        label: "Pool",
        icon: TbPool,
        description: "This property has a pool."
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "This property is located on an island."
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is close to a lake."
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has skiing facilities."
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is in a castle."
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This property is in a camping site."
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This property is in the arctic."
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This property is in a cave."
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the desert."
    },
    {
        label: "Barn",
        icon: GiBarn,
        description: "This property is in a barn."
    },
    {
        label: "Luxe",
        icon: IoDiamond,
        description: "This property is luxurious."
    },
]

    

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/"; 

    if (!isMainPage) {
        return null;
    }

    return ( 
         <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
         </Container>
            
        
     );
}
 
export default Categories;