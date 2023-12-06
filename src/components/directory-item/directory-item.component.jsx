import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { useNavigate } from 'react-router-dom';


const DirectoryItem = ({ category }) => {
    const navigate = useNavigate()
    const handleClick = () => navigate(`shop/${category.title.toLowerCase()}`);

    return (
        <DirectoryItemContainer onClick={handleClick}>
            <BackgroundImage imageUrl={category.imageUrl} />
            <Body>
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem