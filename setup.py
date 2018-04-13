try:
    from setuptools import setup, find_packages
except ImportError:
    from distutuls.core import setup

config = {
    'description': 'mastermind',
    'author': 'Charlie',
    'url': 'https://github.com/cyaris',
    'author_email': 'charlieyaris@gmail.com',
    'version': '0.1',
    'install_requires': ['nose'],
    'packages': ['mastermind'],
    'scripts': [],
    'name': 'mastermind'
}

setup(**config)

setup(
    package_data={
    '':['mastermind_pieces.txt', 'mastermind_board.txt']
    }
    include_package_data=True
)
