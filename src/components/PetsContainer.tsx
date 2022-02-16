import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "../supabaseClient";
import PetsCard from "./PetsCard";
import { PetCard } from "../models/PetsCardInterface";

function PetsContainer() {
    // The fetchedPets variable is just to save the original array
    const [fetchedPets, setFetchedPets] = useState<PetCard[] | null>([]);
    const [petsList, setPetsList] = useState<PetCard[] | null>([]);

    async function fetchThePets(abortCont: any) {
        let { data: pets, error } = await supabase
            .from("pets")
            .select("*")
            .abortSignal(abortCont.signal);

        if (error) {
            return;
        }
        setPetsList(pets);
        setFetchedPets(pets);
    }

    useEffect(() => {
        const abortCont = new AbortController();
        fetchThePets(abortCont);
        //Cleanup
        return () => {
            abortCont.abort();
        };
    }, []);

    function handleInputChange(
        e: ChangeEvent<HTMLInputElement>,
        petSearch: PetCard[] | null
    ) {
        if (!petSearch) return;
        const searchQuery = e.target.value;
        const filteredArray: PetCard[] = petSearch?.filter((pet) => {
            return pet.name.toLocaleLowerCase().includes(searchQuery);
        });

        if (searchQuery.length === 0) {
            setPetsList(fetchedPets);
            return;
        }

        setPetsList(filteredArray);
    }

    return (
        <div className="w-[1091px] h-auto bg-[#E0B9A3] mt-4 border-4 border-[#337B91] rounded-lg shadow-md flex flex-col items-center">
            <input
                type="text"
                placeholder="Search for a pet"
                onChange={(e) => handleInputChange(e, fetchedPets)}
                className="inputs w-52 mt-4"
            />

            <ul className="grid grid-cols-4 gap-10 mt-6 mb-6">
                {petsList &&
                    petsList.map((pet) => {
                        return <PetsCard pet={pet} />;
                    })}
            </ul>
        </div>
    );
}

export default PetsContainer;
