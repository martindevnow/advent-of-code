# Require the utils.rb file using require_relative
require_relative '../utils'

# Call the read_file function to read the contents of data.txt
file_path = 'day-11/data.txt'  # Path to the data.txt file relative to the project root
file_content = read_file(file_path)

lines = file_content.split(" ").map{ |l| l.to_i }
puts lines


puts ":: Part 1 ::";

def blink(nums, times)
  frequencyHash = Hash.new(0)

  nums.each do |num|
    frequencyHash[num] += 1
  end

  times.times do
    blinkResult = Hash.new(0)

    frequencyHash.each do |key, quantity|
      keyNumber = key.to_i

      if keyNumber == 0
        blinkResult[1] = blinkResult[1] + quantity
      elsif key.to_s.length % 2 == 0
        mid = key.to_s.length / 2
        left = key.to_s[0...mid].to_i
        right = key.to_s[mid..-1].to_i

        blinkResult[left] += quantity
        blinkResult[right] += quantity
      else
        mult = keyNumber * 2024
        blinkResult[mult] += quantity

      end
    end
    frequencyHash = blinkResult

  end
  frequencyHash.values.sum

end

result = blink(lines, 75)

puts result
