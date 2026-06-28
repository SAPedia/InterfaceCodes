import './tailwind.css';
import './.cache/styles.css';
import './main.css';
import { createRoot } from 'react-dom/client';
import { Preferences } from './app/preferences';
import { Router } from './app/router';

const prefsContainer = document.getElementById('citizen-preferences-content');
if (prefsContainer) {
    createRoot(prefsContainer).render(<Preferences />);
}

document.querySelectorAll('.citizen-dropdown').forEach(container => {
    const details = container.querySelector('.citizen-dropdown-details');
    const summary = container.querySelector('.citizen-dropdown-summary');
    const target = container.querySelector('.citizen-menu__card');
    if (!(details instanceof HTMLDetailsElement && summary && target)) {
        return;
    }

    const dismissIfOutside = (e: Event) => {
        if (target.contains(e.target as Node) || summary.contains(e.target as Node)) {
            return;
        }
        details.open = false;
    };

    details.addEventListener('toggle', () => {
        if (details.open) {
            window.addEventListener('mousedown', dismissIfOutside);
        } else {
            window.removeEventListener('mousedown', dismissIfOutside);
        }
    });
});

const appContainer = document.getElementById('dev-app');
if (appContainer) {
    createRoot(appContainer).render(<Router />);
}
