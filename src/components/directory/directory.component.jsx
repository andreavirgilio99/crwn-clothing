import CategoryItem from "../category-item/category-item.component"
import './directory.styles.scss'

const Directory = ({ categories }) => {
    return (
        <div className='categories-container'>
            {categories.map(category => {
                return (
                    <CategoryItem category={category} key={category.id}></CategoryItem>
                )
            })}
        </div>
    )
}

export default Directory;
