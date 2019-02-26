import unittest
# from nose.tools import *
# import ex45.mastermind
from ex45 import mastermind
# from ex45 import "mastermind_pieces.txt"
# import ex45
# from ex45.mastermind import Level


if __name__ == '__main__':
    unittest.main()


class TestLevel(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        print("SET UP!")

    @classmethod
    def test_generate_code(self):
        print("before blah")


        level = mastermind.Level()
        # level = ex45.mastermind.Level()
        print("after blah")
        assert_equal(len(level.generate_code()), 12672)

    @classmethod
    def teardown(cls):
        print("TEAR DOWN!")
