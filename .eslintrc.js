module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'react/jsx-indent': 'off',
		'import/order': 'off',
		'react/jsx-indent-props': 'off',
		'react/no-array-index-key': 'off',
		'jsx-a11y/alt-text': 'off',
		'react/jsx-props-no-spreading': 'off',
		'consistent-return': 'off',
		'react/prop-types': 'off',
		'react/destructuring-assignment': 'off',
		'react/react-in-jsx-scope': 'off',
		'arrow-parens': 'off',
		'import/no-named-as-default': 'off',
		'react/exhaustive-deps': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'no-param-reassign': 'off',
		'linebreak-style': 'off',
		'react/no-unescaped-entities': 'off',
    }
};
