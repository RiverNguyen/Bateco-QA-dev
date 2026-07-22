import type { IFieldsSection } from '@/interfaces/fields.interface'

type FieldsContent = {
  desc: string
  summary: string
  highlights: string[]
  sections: IFieldsSection[]
  closing?: string
}

/** Nội dung chi tiết từ tài liệu BATECO — Nội dung chi tiết lĩnh vực hoạt động */
export const FIELDS_CONTENT: Record<string, FieldsContent> = {
  'dinh-vi-dan-duong': {
    desc: 'Hệ thống dẫn đường quán tính (INS) kết hợp IMU, GNSS và bộ lọc Kalman — định vị độc lập, bảo mật tuyệt đối khi mất tín hiệu vệ tinh.',
    summary:
      'INS kết hợp IMU, GNSS và bộ lọc Kalman — định vị độc lập khi mất tín hiệu vệ tinh, ứng dụng RLG, FOG và MEMS.',
    highlights: ['INS / IMU / GNSS', 'RLG & FOG', 'MEMS / Thạch anh'],
    sections: [
      {
        title: 'Dẫn đường Quán tính (INS) là gì?',
        paragraphs: [
          'INS là chữ viết tắt của Inertial Navigation System (Hệ thống Dẫn đường Quán tính). Nó bao gồm các cảm biến IMU cùng với các con quay hồi chuyển và gia tốc kế của chúng, cũng như một cảm biến để tiếp nhận dữ liệu vị trí tuyệt đối từ các vệ tinh GNSS ngoài không gian. Hệ thống này cũng có thể được trang bị thêm từ kế để đo từ trường trong không gian ba chiều.',
          'INS bổ sung khả năng xử lý dữ liệu tiên tiến, bao gồm bộ lọc Kalman và các thuật toán xử lý khác. Bằng cách tham chiếu đến vị trí bắt đầu đã biết, hệ thống sử dụng các dữ liệu đầu ra từ IMU để xác định vị trí và vectơ thời gian thực của một vật thể. "Vật thể" này có thể là ô tô, tàu ngầm, máy bay hoặc bất kỳ phương tiện nào vận hành trong không gian ba chiều.',
        ],
      },
      {
        title: 'Tại sao chúng ta cần hệ thống dẫn đường quán tính?',
        paragraphs: [
          'Hệ thống GPS, định vị vệ tinh hoàn toàn vô dụng dưới lòng đất, dưới biển hoặc khi xảy ra ra xung đột quân sự. Để tự định vị, các phương tiện như tàu ngầm bắt buộc phải sử dụng Hệ thống dẫn đường quán tính (INS).',
          'Dựa vào dữ liệu từ gia tốc kế và con quay hồi chuyển, INS áp dụng phương pháp "tính toán định vị dự đoán" (dead reckoning) — lấy vị trí xuất phát ban đầu rồi liên tục cộng dồn các hướng đi, vận tốc nội tại để suy ra tọa độ thời gian thực mà không cần bất kỳ tín hiệu bên ngoài nào.',
          'Vì sai số của INS sẽ tích lũy theo thời gian, hệ thống cần được hiệu chuẩn lại bất cứ khi nào kết nối lại được với GPS. Nhờ tính bảo mật và độc lập tuyệt đối này, INS là phương thức định vị chính của tàu ngầm, tàu vũ trụ, đồng thời là hệ thống dự phòng sống còn cho máy bay, tên lửa và UAV khi bị chế áp điện tử.',
        ],
      },
      {
        title: 'Con quay hồi chuyển laser vòng (RLG)',
        paragraphs: [
          'Con quay hồi chuyển laser vòng hoạt động dựa trên nguyên lý của hiệu ứng Sagnac. Một tia laser duy nhất được tách thành hai chùm tia di chuyển quanh vòng theo các hướng ngược nhau. Cảm biến sẽ đo mô hình giao thoa gây ra bởi chuyển động của cấu trúc dọc theo một trục duy nhất.',
          'RLG thường được nạp khí Helium-Neon. Các điện cực kích thích các sóng ánh sáng truyền theo các hướng ngược nhau. Phát minh ra Con quay hồi chuyển Laser vòng được công nhận rộng rãi là của các kỹ sư hàng không vũ trụ Honeywell vào những năm 1960.',
        ],
      },
      {
        title: 'Con quay hồi chuyển cáp quang (FOG)',
        paragraphs: [
          'Con quay hồi chuyển FOG tương tự như con quay RLG, phát hiện chuyển động bằng hiệu ứng Sagnac. Các chùm tia laser được phóng vào một cáp quang duy nhất nhưng chúng truyền theo các hướng ngược nhau. Chùm tia di chuyển theo hướng quay của khung sẽ đến nhanh hơn một chút so với chùm tia kia. Phép đo giao thoa được sử dụng để đo độ dịch pha này và tính toán lượng chuyển động.',
        ],
      },
      {
        title: 'Con quay hồi chuyển Thạch anh/MEMS',
        paragraphs: [
          'MEMS là viết tắt của "hệ thống vi cơ điện tử". Đây là các cảm biến và thiết bị nhỏ có thể được sản xuất bằng nhiều phương pháp tương tự như phương pháp chế tạo chất bán dẫn. Do đó, có thể chế tạo một con quay hồi chuyển đủ nhỏ và rẻ để lắp đặt bên trong điện thoại thông minh, tay cầm chơi game và hàng ngàn loại máy móc khác.',
          'Các tinh thể thạch anh phản ứng với chuyển động, hoạt động như một cảm biến Coriolis. Kết hợp với một bộ cộng hưởng âm thoa, cảm biến thạch anh tạo ra một đầu ra có thể được xử lý bởi các vi mạch điện tử tích hợp. Bất chấp kích thước nhỏ và giá thành tương đối thấp, con quay hồi chuyển MEMS vẫn đủ chính xác cho một loạt các ứng dụng.',
        ],
      },
    ],
    closing: undefined,
  },
  'thong-tin-lien-lac': {
    desc: 'Trong tác chiến hiện đại, thông tin liên lạc là yếu tố cốt lõi bảo đảm khả năng chỉ huy, điều hành và phối hợp giữa các lực lượng trên chiến trường. Các hệ thống thông tin quân sự ngày nay không chỉ truyền tải thoại mà còn hỗ trợ truyền dữ liệu, hình ảnh và video thời gian thực, góp phần nâng cao nhận thức tình huống và hiệu quả tác chiến.',
    summary:
      'Tactical Radio, MANET, SATCOM và Data Link — liên lạc chiến thuật thời gian thực trên mọi điều kiện tác chiến.',
    highlights: ['Tactical Radio', 'MANET & SATCOM', 'Data Link / UUV'],
    sections: [
      {
        title: 'Vô tuyến chiến thuật (Tactical Radio)',
        paragraphs: [
          'Ở cấp chiến thuật, các hệ thống vô tuyến quân sự (Tactical Radio) được sử dụng để duy trì liên lạc giữa sở chỉ huy, bộ binh và các phương tiện tác chiến. Các thiết bị này thường được trang bị khả năng mã hóa, chống nhiễu và nhảy tần nhằm bảo đảm an toàn thông tin trong môi trường tác chiến điện tử.',
        ],
      },
      {
        title: 'Mạng MANET',
        paragraphs: [
          'Đối với các lực lượng cơ động, mạng MANET (Mobile Ad-hoc Network) cho phép các nút mạng tự động kết nối với nhau mà không cần hạ tầng cố định. Giải pháp này giúp duy trì liên lạc ổn định tại những khu vực có địa hình phức tạp hoặc thiếu cơ sở hạ tầng viễn thông.',
        ],
      },
      {
        title: 'Thông tin vệ tinh & Data Link',
        paragraphs: [
          'Để đáp ứng yêu cầu liên lạc ngoài tầm nhìn, các hệ thống thông tin vệ tinh (SATCOM) được sử dụng để kết nối lực lượng trên bộ, trên biển và trên không trên phạm vi rộng. Bên cạnh đó, các giải pháp Data Link cho phép chia sẻ dữ liệu mục tiêu, hình ảnh trinh sát và thông tin chiến trường theo thời gian thực giữa các nền tảng như UAV, radar, tàu chiến và trung tâm chỉ huy.',
        ],
      },
      {
        title: 'Liên lạc dưới nước (UUV)',
        paragraphs: [
          'Đối với các hệ thống không người lái dưới nước (UUV), công nghệ liên lạc âm thanh dưới nước đóng vai trò quan trọng trong việc truyền lệnh điều khiển và dữ liệu cảm biến giữa các phương tiện ngầm.',
        ],
      },
      {
        title: 'Hệ sinh thái liên lạc tích hợp',
        paragraphs: [
          'Sự kết hợp giữa Tactical Radio, MANET, SATCOM và Data Link tạo nên một hệ sinh thái thông tin liên lạc hiện đại, góp phần nâng cao năng lực chỉ huy, kiểm soát và hiệu quả tác chiến của các lực lượng quân sự trong mọi điều kiện hoạt động.',
        ],
      },
    ],
    closing:
      'BATECO Quốc An là nhà cung cấp các giải pháp và sản phẩm về thông tin liên lạc cho An Ninh Quốc Phòng với mạng lưới đối tác, thương hiệu hàng đầu trên Thế Giới',
  },
  'sonar-thuy-am': {
    desc: 'Các hệ thống sonar và thủy âm đóng vai trò quan trọng trong các hoạt động giám sát, trinh sát và tác chiến dưới nước, cung cấp khả năng phát hiện, định vị và theo dõi mục tiêu trong môi trường mà các cảm biến quang học hoặc vô tuyến không thể hoạt động hiệu quả. Đây là những công nghệ nền tảng được sử dụng rộng rãi trên tàu mặt nước, tàu ngầm, phương tiện không người lái dưới nước (UUV) và các hệ thống giám sát biển.',
    summary:
      'Sonar, hydrophone và cảm biến thủy âm — phát hiện, định vị mục tiêu dưới nước trên tàu, UUV và hệ thống giám sát biển.',
    highlights: ['Active / Passive Sonar', 'Hydrophone', 'DVL & Side Scan'],
    sections: [
      {
        title: 'Nguyên lý sonar chủ động & bị động',
        paragraphs: [
          'Sonar hoạt động dựa trên nguyên lý phát và thu sóng âm trong môi trường nước để xác định vị trí, khoảng cách, hướng di chuyển và đặc tính của mục tiêu. Tùy theo nhiệm vụ, các hệ thống có thể sử dụng sonar chủ động (Active Sonar), sonar bị động (Passive Sonar) hoặc kết hợp cả hai nhằm tối ưu hiệu quả phát hiện và nhận dạng mục tiêu.',
        ],
      },
      {
        title: 'Hydrophone & cảm biến thủy âm',
        paragraphs: [
          'Bên cạnh đó, các cảm biến thủy âm như hydrophone được sử dụng để thu nhận tín hiệu âm thanh dưới nước, phục vụ các nhiệm vụ giám sát, cảnh giới, phát hiện tàu ngầm, phương tiện không người lái và các nguồn phát âm khác. Khi được triển khai theo mạng lưới hoặc tích hợp trên các nền tảng di động, các hệ thống thủy âm có thể cung cấp khả năng giám sát liên tục trên phạm vi rộng với độ bí mật cao.',
        ],
      },
      {
        title: 'DVL, Side Scan, Imaging & Multibeam',
        paragraphs: [
          'Đối với các phương tiện tự hành dưới nước, các thiết bị chuyên dụng như Doppler Velocity Log (DVL), sonar quét sườn (Side Scan Sonar), sonar tạo ảnh (Imaging Sonar) và sonar đa tia (Multibeam Sonar) hỗ trợ dẫn đường, tránh vật cản, lập bản đồ đáy biển và thu thập dữ liệu môi trường. Những công nghệ này đặc biệt quan trọng trong các nhiệm vụ trinh sát, khảo sát hải dương học, bảo vệ cơ sở hạ tầng biển và bảo đảm an ninh hàng hải.',
        ],
      },
      {
        title: 'Tích hợp & năng lực tác chiến',
        paragraphs: [
          'Sự kết hợp giữa các hệ thống sonar, cảm biến thủy âm và công nghệ xử lý tín hiệu tiên tiến giúp nâng cao đáng kể khả năng nhận thức tình huống dưới nước, hỗ trợ lực lượng hải quân và an ninh biển phát hiện sớm mối đe dọa, tăng cường năng lực giám sát và bảo vệ hiệu quả các vùng biển chiến lược.',
        ],
      },
    ],
    closing:
      'BATECO Quốc An là nhà cung cấp các giải pháp và sản phẩm về SONAR, liên lạc thủy âm cho An Ninh Quốc Phòng với mạng lưới đối tác, các thương hiệu hàng đầu trên Thế Giới.',
  },
  'quang-dien-tu': {
    desc: 'Các giải pháp Quang điện tử (Optronics) đóng vai trò quan trọng trong việc nâng cao năng lực giám sát, trinh sát, phát hiện và nhận dạng mục tiêu cho các lực lượng quốc phòng và an ninh. Với sự phát triển của công nghệ cảm biến hiện đại, các hệ thống EO/IR (Electro-Optical/Infrared) ngày nay đã trở thành thành phần không thể thiếu trên các nền tảng mặt đất, hải quân, không quân và hệ thống không người lái.',
    summary: 'EO/IR, SWIR, LRF và ISR Payload — giám sát đa phổ trên UAV, UGV, USV và tàu chiến.',
    highlights: ['EO / IR / SWIR', 'Gimbal & ISR', 'C4ISR tích hợp'],
    sections: [
      {
        title: 'Cảm biến EO / IR / SWIR / LRF',
        paragraphs: [
          'Một hệ thống quang điện tử hiện đại thường tích hợp nhiều loại cảm biến như camera ảnh ngày độ phân giải cao (EO Camera), thiết bị ảnh nhiệt (Thermal Imaging), cảm biến hồng ngoại sóng ngắn (SWIR), Laser Rangefinder và Laser Target Designator. Sự kết hợp giữa các công nghệ này cho phép phát hiện, nhận dạng và theo dõi mục tiêu ở khoảng cách xa trong cả điều kiện ngày, đêm, thời tiết bất lợi hoặc môi trường có tầm nhìn hạn chế.',
        ],
      },
      {
        title: 'Gimbal Camera & ISR Payload',
        paragraphs: [
          'Đối với các nền tảng UAV, UGV, USV và tàu chiến, các hệ thống Gimbal Camera và ISR Payload được sử dụng để cung cấp hình ảnh và dữ liệu thời gian thực phục vụ các nhiệm vụ Intelligence, Surveillance and Reconnaissance (ISR). Các tải trọng cảm biến này hỗ trợ giám sát biên giới, bảo vệ mục tiêu trọng yếu, tuần tra hàng hải, trinh sát chiến trường và đánh giá tình huống tác chiến với độ chính xác cao.',
        ],
      },
      {
        title: 'Tích hợp hỏa lực & C4ISR',
        paragraphs: [
          'Bên cạnh khả năng quan sát và thu thập thông tin, các hệ thống EO/IR còn có thể tích hợp với hệ thống điều khiển hỏa lực, radar, Data Link và mạng C4ISR nhằm hình thành một kiến trúc tác chiến lấy dữ liệu làm trung tâm. Dữ liệu từ các cảm biến được truyền tải và xử lý theo thời gian thực, giúp rút ngắn chu trình phát hiện – nhận dạng – quyết định – tác động mục tiêu.',
        ],
      },
      {
        title: 'Năng lực nhận thức tình huống',
        paragraphs: [
          'Sự kết hợp giữa công nghệ EO/IR, Thermal Imaging, Laser Rangefinder, Target Designator, ISR Payload và các thuật toán xử lý hình ảnh tiên tiến giúp nâng cao đáng kể năng lực nhận thức tình huống, hỗ trợ ra quyết định nhanh chóng và tăng cường hiệu quả thực hiện nhiệm vụ trong các môi trường hoạt động phức tạp.',
        ],
      },
    ],
    closing:
      'BATECO Quốc An là nhà cung cấp các giải pháp, sản phẩm về Quang Điện Tử (Optronics) và các module, cảm biến phục vụ nghiên cứu, tích hợp và sản xuất các Camera ứng dụng cho An Ninh Quốc Phòng',
  },
  'tac-chien-dien-tu': {
    desc: 'Các giải pháp Tác chiến điện tử (Electronic Warfare – EW) đóng vai trò then chốt trong chiến tranh hiện đại, giúp lực lượng quân sự giành ưu thế trên phổ điện từ thông qua khả năng phát hiện, khai thác, gây nhiễu và vô hiệu hóa các hệ thống điện tử của đối phương.',
    summary:
      'Electronic Warfare — phát hiện, gây nhiễu và vô hiệu hóa radar, liên lạc, Counter-UAS trên phổ điện từ.',
    highlights: ['ES / EA / EP', 'ECM & gây nhiễu', 'Counter-UAS'],
    sections: [
      {
        title: 'Bối cảnh tác chiến điện tử',
        paragraphs: [
          'Với sự phát triển của các công nghệ radar, thông tin liên lạc và hệ thống dẫn đường, tác chiến điện tử đã trở thành một thành phần không thể thiếu trong các hoạt động quốc phòng và an ninh hiện đại.',
        ],
      },
      {
        title: 'ES, EA & EP — ESM, ELINT, COMINT',
        paragraphs: [
          'Một hệ thống tác chiến điện tử thường được xây dựng trên ba lĩnh vực chính gồm Electronic Support (ES), Electronic Attack (EA) và Electronic Protection (EP). Trong đó, các hệ thống ESM (Electronic Support Measures), ELINT (Electronic Intelligence) và COMINT (Communications Intelligence) được sử dụng để phát hiện, thu thập, phân tích và định vị các nguồn phát xạ điện từ như radar, hệ thống thông tin liên lạc hoặc tín hiệu điều khiển của đối phương. Các dữ liệu này cung cấp thông tin tình báo quan trọng, góp phần nâng cao nhận thức tình huống và hỗ trợ ra quyết định trên chiến trường.',
        ],
      },
      {
        title: 'ECM & Electronic Attack',
        paragraphs: [
          'Ở cấp độ tác chiến, các giải pháp ECM (Electronic Countermeasures) và Electronic Attack cho phép gây nhiễu, đánh lừa hoặc làm suy giảm hiệu quả hoạt động của radar, hệ thống thông tin liên lạc, thiết bị dẫn đường và các cảm biến điện tử. Những năng lực này giúp bảo vệ lực lượng, làm giảm khả năng phát hiện của đối phương và tăng khả năng sống còn của các nền tảng tác chiến.',
        ],
      },
      {
        title: 'Counter-UAS',
        paragraphs: [
          'Bên cạnh đó, các hệ thống Counter-UAS ngày càng được triển khai rộng rãi nhằm phát hiện, theo dõi và vô hiệu hóa các phương tiện bay không người lái thông qua việc kết hợp radar, cảm biến RF, EO/IR và các công nghệ gây nhiễu chuyên dụng. Đây là một trong những lĩnh vực phát triển nhanh nhất của tác chiến điện tử trước sự gia tăng của các mối đe dọa từ UAV trên chiến trường hiện đại.',
        ],
      },
      {
        title: 'Tích hợp C4ISR',
        paragraphs: [
          'Các giải pháp tác chiến điện tử hiện nay thường được tích hợp với hệ thống C4ISR, mạng thông tin chiến thuật, radar và các cảm biến đa miền nhằm tạo nên một kiến trúc tác chiến thống nhất. Sự kết hợp giữa ESM, ELINT, COMINT, ECM, Counter-UAS và các công nghệ xử lý tín hiệu tiên tiến giúp nâng cao khả năng kiểm soát phổ điện từ, tăng cường năng lực phòng vệ và tạo ưu thế tác chiến trong môi trường xung đột hiện đại.',
        ],
      },
    ],
    closing: undefined,
  },
  'vat-tu-anqp': {
    desc: 'BATECO Quốc An là đơn vị cung cấp vật tư, trang thiết bị và máy móc công nghiệp phục vụ các nhà máy, cơ sở nghiên cứu và đơn vị sản xuất trong lĩnh vực quốc phòng. Với mạng lưới đối tác là các nhà sản xuất và thương hiệu công nghiệp hàng đầu trên thế giới, BATECO Quốc An mang đến các giải pháp đáp ứng yêu cầu khắt khe về chất lượng, độ chính xác, độ tin cậy và tính ổn định trong môi trường sản xuất chuyên dụng.',
    summary:
      'Vật tư, máy móc công nghiệp và thiết bị đo lường phục vụ nhà máy, nghiên cứu và sản xuất quốc phòng.',
    highlights: ['Máy móc công nghiệp', 'Thiết bị đo lường', 'Tư vấn & hậu mãi'],
    sections: [
      {
        title: 'Danh mục sản phẩm',
        paragraphs: [
          'Danh mục sản phẩm và giải pháp của BATECO Quốc An bao gồm máy móc gia công cơ khí, thiết bị đo lường và kiểm tra, dụng cụ sản xuất, vật tư kỹ thuật, thiết bị điện – điện tử công nghiệp, hệ thống tự động hóa và các giải pháp hỗ trợ sản xuất hiện đại. Các sản phẩm được lựa chọn nhằm đáp ứng nhu cầu nâng cao năng suất, tối ưu hóa quy trình sản xuất và bảo đảm chất lượng sản phẩm tại các nhà máy quốc phòng.',
        ],
      },
      {
        title: 'Tư vấn kỹ thuật & hậu mãi',
        paragraphs: [
          'Bên cạnh việc cung cấp thiết bị, BATECO Quốc An còn hỗ trợ tư vấn kỹ thuật, lựa chọn giải pháp phù hợp, chuyển giao công nghệ và dịch vụ hậu mãi, góp phần giúp khách hàng triển khai hiệu quả các dự án đầu tư, nâng cấp và hiện đại hóa dây chuyền sản xuất. Với định hướng trở thành đối tác tin cậy của ngành công nghiệp quốc phòng, BATECO Quốc An cam kết cung cấp các sản phẩm và giải pháp chất lượng cao, đáp ứng yêu cầu phát triển bền vững và hiện đại hóa năng lực sản xuất trong nước.',
        ],
      },
    ],
    closing: undefined,
  },
}
