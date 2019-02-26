import random
import os
from sys import exit
from colored import fore, style

class Game(object):

    def welcome_game(self):
        print("\nWelcome to " + style.BOLD + fore.DARK_RED_2 + "M"
        + fore.ORANGE_3 + "a" + fore.YELLOW_1 + "s"
        + fore.GREEN_1 + "t" + fore.DODGER_BLUE_1 + "e"
        + fore.PURPLE_4B + "r" + fore.DARK_RED_2 + "m"
        + fore.ORANGE_3 + "i" + fore.YELLOW_1 + "n"
        + fore.GREEN_1 + "d" + fore.DODGER_BLUE_1 + "!" + style.RESET)
        print("Who do I have the pleasure of challenging today?\n")
        self.player_name = input("Name > ")
        return self.player_name

    def start_game(self):
        try:
            os.remove("mastermind_board.txt")
        except:
            pass
        print("_" * 60)
        decision = True
        while decision:
            print(f"\nPick a level {self.player_name}.")
            level_choice = input("> ")
            if level_choice=='1':
                return 'level_one'
            elif level_choice=='2':
                return 'level_two'
            elif level_choice=='3':
                return 'level_three'
            else:
                print("\nTry 1, 2, or 3.")

    def exit_game(self):
        print("_" * 60)
        print("\nYou've exited the game.")
        print(style.BOLD + fore.WHITE
        + f"Hope you'll play again soon {self.player_name}!\n"
        + style.RESET)
        exit()


class Level(object):

    def __init__(self):
        self.current_turn = 0
        self.piece_list = []
        self.generate_code()

    def generate_code(self):
        pieces = open("mastermind_pieces.txt")
        pieces.seek(0)
        for piece in pieces:
            self.piece_list.append(piece.strip("[,],\n"))
        pieces.close()
        self.code_color_1 = random.choice(self.piece_list)
        self.code_color_2 = random.choice(self.piece_list)
        self.code_color_3 = random.choice(self.piece_list)
        self.code_color_4 = random.choice(self.piece_list)
        self.color_code = [self.code_color_1, self.code_color_2,
        self.code_color_3, self.code_color_4]
        return self.piece_list

    def round(self):
        self.current_turn += 1
        print(f"\nRound {self.current_turn} of {self.final_turn}")
        self.color_index = 0
        self.deletion_count = 0
        self.black_count = 0
        self.white_count = 0

    def play(self):
        non_color_message = "\nTry red, orange, yellow, green, blue, or purple."
        non_color = True
        while non_color:
            self.color_1 = input("1. > ").lower()
            if self.color_1 in self.piece_list:
                non_color = False
            else:
                print(non_color_message)
        non_color = True
        while non_color:
            self.color_2 = input("2. > ").lower()
            if self.color_2 in self.piece_list:
                non_color = False
            else:
                print(non_color_message)
        non_color = True
        while non_color:
            self.color_3 = input("3. > ").lower()
            if self.color_3 in self.piece_list:
                non_color = False
            else:
                print(non_color_message)
        non_color = True
        while non_color:
            self.color_4 = input("4. > ").lower()
            if self.color_4 in self.piece_list:
                non_color = False
            else:
                print(non_color_message)
        print("_" * 60)
        print("\n" + fore.DARK_RED_2 + "c"
        + fore.ORANGE_3 + "o" + fore.YELLOW_1 + "l"
        + fore.GREEN_1 + "o" + fore.DODGER_BLUE_1 + "r"
        + fore.PURPLE_4B + "s" + style.RESET + ": "
        + fore.DARK_RED_2 + 'red' + style.RESET + ", "
        + fore.ORANGE_3 + 'orange' + style.RESET + ", "
        + fore.YELLOW_1 + 'yellow' + style.RESET + ", "
        + fore.GREEN_1 + 'green' + style.RESET + ", "
        + fore.DODGER_BLUE_1 + 'blue' + style.RESET + ", "
        + fore.PURPLE_4B + 'purple' + style.RESET + ".\n")
        self.board()

    def board(self):
        self.board_colors = {'yellow': fore.YELLOW_1, 'blue': fore.DODGER_BLUE_1,
        'red': fore.DARK_RED_2, 'green': fore.GREEN_1,
        'orange': fore.ORANGE_3, 'purple': fore.PURPLE_4B}
        board_color_text = {'yellow': 'yellow', 'blue': 'blue  ', 'red': 'red   ',
        'green': 'green ', 'orange': 'orange', 'purple': 'purple'}
        print("You guessed " + self.board_colors[self.color_1]
        + f"{self.color_1}" + style.RESET + ", "
        + self.board_colors[self.color_2]
        + f"{self.color_2}" + style.RESET + ", "
        + self.board_colors[self.color_3]
        + f"{self.color_3}" + style.RESET + ", "
        + self.board_colors[self.color_4]
        + f"{self.color_4}" + style.RESET + ".\n")
        guess_colors = [self.color_1, self.color_2, self.color_3, self.color_4]
        color_delete = self.color_code[:]
        guess_check = guess_colors[:]
        for guess in self.color_code:
            if guess_check[self.color_index - self.deletion_count]==guess:
                self.black_count += 1
                del(guess_check[self.color_index - self.deletion_count])
                del(color_delete[self.color_index - self.deletion_count])
                self.deletion_count += 1
            self.color_index += 1
        while guess_check:
            if guess_check[0] in color_delete:
                self.white_count += 1
                delete_index = color_delete.index(guess_check[0])
                del(guess_check[0])
                del(color_delete[delete_index])
            else:
                del(guess_check[0])
        if self.current_turn < 10:
            board_current_turn = f"{self.current_turn} "
        else:
            board_current_turn = self.current_turn
        board_file = open("./mastermind_board.txt", 'a+')
        top_line = (" " * 43) + ("B     W")
        if self.current_turn==1:
            board_file.write(top_line)
        scoring_symbols = {0: '  ', 1: ' .', 2: ' :', 3: ':.', 4: '::'}
        board_file.write(f"\n {board_current_turn} | ")
        board_file.write(self.board_colors[self.color_1]
        + f"{board_color_text[self.color_1]}" + style.RESET + " | ")
        board_file.write(self.board_colors[self.color_2]
        + f"{board_color_text[self.color_2]}" + style.RESET + " | ")
        board_file.write(self.board_colors[self.color_3]
        + f"{board_color_text[self.color_3]}" + style.RESET + " | ")
        board_file.write(self.board_colors[self.color_4]
        + f"{board_color_text[self.color_4]}" + style.RESET + " |")
        board_file.write(style.BOLD + fore.WHITE
        + f" {scoring_symbols[self.black_count]}  "+ style.RESET + "|"
        + style.BOLD + fore.WHITE
        + f" {scoring_symbols[self.white_count]}  " + "|" + style.RESET)
        print("Here's the board:")
        board_file.seek(0)
        print(board_file.read())
        board_file.close()
        if guess_colors==self.color_code:
            self.end_win()
        elif self.current_turn==self.final_turn and guess_colors != self.color_code:
            self.end_lose()
        else:
            self.round()
            self.play()

    def end_win(self):
        print(style.BOLD + style.BLINK + fore.WHITE
        + f"\nYou win {self.player_name}!" + style.RESET)
        print(f"Great job.\n")
        self.choose_level()

    def end_lose(self):
        print(style.BOLD + style.BLINK + fore.WHITE
        + f"\nYou lose {self.player_name}!" + style.RESET)
        print("The code was " + self.board_colors[self.code_color_1]
        + f"{self.code_color_1}" + style.RESET + ", "
        + self.board_colors[self.code_color_2]
        + f"{self.code_color_2}" + style.RESET + ", "
        + self.board_colors[self.code_color_3]
        + f"{self.code_color_3}" + style.RESET + ", "
        + self.board_colors[self.code_color_4]
        + f"{self.code_color_4}" + style.RESET + ".\n")
        self.choose_level()

    def choose_level(self):
        print("Want to keep playing?")
        choosing = True
        while choosing:
            keep_playing = input("> ")
            if keep_playing.lower()=='yes':
                choosing = False
                print("\nCool!")
                level_choice = run_game.start_game()
                level_go = GameMap.levels[level_choice]
                start_level = level_go.welcome_level(welcome_input)
                start_level = level_go.__init__()
                start_level = level_go.round()
                start_level = level_go.play()
            elif keep_playing.lower()=='no':
                choosing = False
                level_choice = run_game.exit_game()
            else:
                print("\nSay yes or no this time.")


class Level1(Level):

    def welcome_level(self, player):
        self.player_name = player
        print("_" * 60)
        print(style.BOLD + style.UNDERLINED + style.BLINK + fore.WHITE
        + "\nLevel 1" + style.RESET)
        print("\nRules:")
        print("You have 12 tries to crack the four-color code.")
        print("Guess each color individually.")
        print("The B column will track right "
        + fore.DARK_RED_2 + "c" + fore.ORANGE_3 + "o"
        + fore.YELLOW_1 + "l" + fore.GREEN_1 + "o"
        + fore.DODGER_BLUE_1 + "r" + fore.PURPLE_4B + "s"
        + style.RESET + " in the right spot.")
        print("The W column will track right "
        + fore.DARK_RED_2 + "c" + fore.ORANGE_3 + "o"
        + fore.YELLOW_1 + "l" + fore.GREEN_1 + "o"
        + fore.DODGER_BLUE_1 + "r" + fore.PURPLE_4B + "s"
        + style.RESET + " in the wrong spot.")
        self.final_turn = 12

class Level2(Level):

    def welcome_level(self, player):
        self.player_name = player
        print("_" * 60)
        print(style.BOLD + style.UNDERLINED + style.BLINK + fore.WHITE
        + "\nLevel 2" + style.RESET)
        print("\nRules:")
        print("You have 10 tries to crack the four-color code.")
        print("Guess each color individually.")
        print("The B column will track right "
        + fore.DARK_RED_2 + "c" + fore.ORANGE_3 + "o"
        + fore.YELLOW_1 + "l" + fore.GREEN_1 + "o"
        + fore.DODGER_BLUE_1 + "r" + fore.PURPLE_4B + "s"
        + style.RESET + " in the right spot.")
        print("The W column will track right "
        + fore.DARK_RED_2 + "c" + fore.ORANGE_3 + "o"
        + fore.YELLOW_1 + "l" + fore.GREEN_1 + "o"
        + fore.DODGER_BLUE_1 + "r" + fore.PURPLE_4B + "s"
        + style.RESET + " in the wrong spot.")
        self.final_turn = 10


class Level3(Level):

    def welcome_level(self, player):
        self.player_name = player
        print("_" * 60)
        print(style.BOLD + style.UNDERLINED + style.BLINK + fore.WHITE
        + "\nLevel 3" + style.RESET)
        print("\nRules:")
        print("You have 8 tries to crack the four-color code.")
        print("Guess each color individually.")
        print("The B column will track right "
        + fore.DARK_RED_2 + "c" + fore.ORANGE_3 + "o"
        + fore.YELLOW_1 + "l" + fore.GREEN_1 + "o"
        + fore.DODGER_BLUE_1 + "r" + fore.PURPLE_4B + "s"
        + style.RESET + " in the right spot.")
        print("The W column will track right "
        + fore.DARK_RED_2 + "c" + fore.ORANGE_3 + "o"
        + fore.YELLOW_1 + "l" + fore.GREEN_1 + "o"
        + fore.DODGER_BLUE_1 + "r" + fore.PURPLE_4B + "s"
        + style.RESET + " in the wrong spot.")
        self.final_turn = 8


class GameMap(object):

    levels = {
        'game': Game(),
        'level_one': Level1(),
        'level_two': Level2(),
        'level_three': Level3(),
    }


run_game = Game()
welcome_input = run_game.welcome_game()
level_choice = run_game.start_game()
level_go = GameMap.levels[level_choice]

start_level = level_go.welcome_level(welcome_input)
start_level = level_go.round()
start_level = level_go.play()
