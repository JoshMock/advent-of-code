extern crate argparse;

use argparse::{ArgumentParser, Store};

fn main() {
    let mut day = 1;
    let mut input = "".to_string();
    {
        let mut ap = ArgumentParser::new();
        ap.set_description("Advent of Code, motherfucker");
        ap.refer(&mut day)
            .add_option(&["-d", "--day"], Store, "What day is it?");
        ap.refer(&mut input)
            .add_option(&["-i", "--input"], Store, "Input file");
        ap.parse_args_or_exit();
    }
    println!("day: {}, input: {}", day, input);
}
