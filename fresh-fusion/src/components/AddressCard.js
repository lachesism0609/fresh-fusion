// components/AddressCard.js
const AddressCard = ({ city, street, zip }) => {
    const baseStyles = "bg-white text-black border-2 border-pink700 box-border rounded-[10px] p-4";
    const hoverStyles = "hover:bg-pink700 hover:text-white hover:border-white hover:scale-105";
    const activeStyles = "active:scale-95 active:bg-pink900 active:border-pink900 active:shadow-inner";
    const transitionStyles = "shadow-md hover:shadow-lg transition-all duration-200";
    const pointerStyles = "cursor-pointer";

    return (
        <article
            className={`${baseStyles} ${hoverStyles} ${activeStyles} ${transitionStyles} ${pointerStyles } w-full`}
            aria-label={`Location details for ${city}`}
        >
            <h2 className="text-1xl font-semibold">{street}</h2>
            <p className="text-gray-600">{zip}</p>
        </article>
    );
};

export default AddressCard;


