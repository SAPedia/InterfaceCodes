import { Categories } from './components/Categories';
import { Header } from './components/Header';

export default function MainPage() {
    return (
        <div className="flex flex-col gap-1">
            <Header />
            <Categories />
        </div>
    );
}
