extern crate argparse;

use std::fs;

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

    let input_contents = fs::read_to_string(input).expect("Should have been able to read the file");

    match day {
        1 => {
            println!("day 1 let's goooo");
            day1(input_contents);
        }
        _ => {
            println!("no valid day chosen");
        }
    }
}

fn day1(input: String) {
    // part 1
    let lines: Vec<&str> = input.split('\n').collect();
    let mut single_sum: i32 = 0;
    let mut sums: Vec<i32> = Vec::new();
    for line in lines {
        if line != "" {
            let calories: i32 = line.parse().expect("not an number");
            single_sum += calories;
        } else {
            sums.push(single_sum);
            single_sum = 0;
        }
    }
    let max = sums.iter().max();
    match max {
        Some(max) => println!("{}", max),
        None => println!("Empty vector"),
    }

    // part 2
    sums.sort_by(|a, b| b.cmp(a));
    println!("{}", sums[0] + sums[1] + sums[2]);
}
