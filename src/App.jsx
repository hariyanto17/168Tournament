import React, { useState, useEffect, useMemo, useRef } from "react";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState("A");
  const svgRef = useRef(null);

  const groups = useMemo(() => {
    const allParticipants = [];
    for (let i = 1; i <= 128; i++) {
      allParticipants.push({ key: i, name: `Pemain ${i}` });
    }

    const groupA = allParticipants.slice(0, 32);
    const groupB = allParticipants.slice(32, 64);
    const groupC = allParticipants.slice(64, 96);
    const groupD = allParticipants.slice(96, 128);

    return {
      A: groupA,
      B: groupB,
      C: groupC,
      D: groupD,
    };
  }, []);

  // Memisahkan data untuk setiap putaran
  const babak32 = useMemo(() => {
    const currentParticipants = [...groups[selectedGroup]];
    const matches = [];
    for (let i = 0; i < currentParticipants.length; i += 2) {
      matches.push([currentParticipants[i], currentParticipants[i + 1]]);
    }
    return matches;
  }, [groups, selectedGroup]);

  const babak16 = useMemo(() => {
    const winners = babak32.map((match, index) => ({
      key: `winner-0-${index}`,
      name: `base 16 ${index + 1}`,
    }));
    const matches = [];
    for (let i = 0; i < winners.length; i += 2) {
      matches.push([winners[i], winners[i + 1]]);
    }
    return matches;
  }, [babak32]);

  const babak8 = useMemo(() => {
    const winners = babak16.map((match, index) => ({
      key: `winner-1-${index}`,
      name: "Winner",
    }));
    const matches = [];
    for (let i = 0; i < winners.length; i += 2) {
      matches.push([winners[i], winners[i + 1]]);
    }
    return matches;
  }, [babak16]);

  const babak4 = useMemo(() => {
    const winners = babak8.map((match, index) => ({
      key: `winner-2-${index}`,
      name: "Winner",
    }));
    const matches = [];
    for (let i = 0; i < winners.length; i += 2) {
      matches.push([winners[i], winners[i + 1]]);
    }
    return matches;
  }, [babak8]);

  const babakFinal = useMemo(() => {
    const winners = babak4.map((match, index) => ({
      key: `winner-3-${index}`,
      name: "Winner",
    }));
    const matches = [];
    for (let i = 0; i < winners.length; i += 2) {
      matches.push([winners[i], winners[i + 1]]);
    }
    return matches;
  }, [babak4]);


  // Struktur data rounds yang Anda minta
  const rounds = useMemo(
    () => [
      { name: "Putaran Awal (32 Besar)", data: babak32 },
      { name: "Putaran 16 Besar", data: babak16 },
      { name: "Perempat Final", data: babak8 },
      { name: "Semifinal", data: babak4 },
      { name: "Final", data: babakFinal },
    ],
    [babak32, babak16, babak8, babak4, babakFinal]
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1200;
    const height = 1000;
    const matchWidth = 150;
    const matchHeight = 40;
    const paddingX = 100;
    const baseVerticalSpacing = 20; // Jarak vertikal dasar antar pertandingan
    const headerHeight = 100; // Tinggi untuk nama putaran

    svg.attr("width", width).attr("height", height);

    // Group untuk semua elemen bagan
    const g = svg.append("g");

    // Implementasi D3 Zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    let roundX = 20;

    const startY = headerHeight + 50;
    const roundTitleToMatchSpacing = 30;

    rounds.forEach((round, roundIndex) => {

      const roundVerticalSpacing =
        baseVerticalSpacing * Math.pow(2, roundIndex + 1);
      
      // Menampilkan nama putaran
      g.append("text")
        .attr("x", roundX + matchWidth / 2)
        .attr("y", startY + roundTitleToMatchSpacing - 50) 
        .attr("text-anchor", "middle")
        .attr("class", "text-green-500 font-bold text-lg")
        .text(round.name);
        
      round.data.forEach((match, matchIndex) => {
        // yPos1 dihitung berdasarkan startY, ditambah jarak antara blok pertandingan.
        // Sekarang jarak antar match sama dengan jarak antar pemain dalam satu match.
        const yPos1 =
          startY + roundTitleToMatchSpacing + matchIndex * (matchHeight * 2 + 2 * roundVerticalSpacing);
        const yPos2 = yPos1 + matchHeight + roundVerticalSpacing;

        // Menggambar konektor ke putaran berikutnya
        if (roundIndex < rounds.length - 1) {
          const nextRoundY = (yPos1 + yPos2) / 2;
          const path = d3.path();
          // Garis horizontal dari kedua pemain
          path.moveTo(roundX + matchWidth, yPos1 + matchHeight / 2);
          path.lineTo(
            roundX + matchWidth + paddingX / 2,
            yPos1 + matchHeight / 2
          );
          path.moveTo(roundX + matchWidth, yPos2 + matchHeight / 2);
          path.lineTo(
            roundX + matchWidth + paddingX / 2,
            yPos2 + matchHeight / 2
          );

          // Garis vertikal yang menghubungkan kedua pemain
          path.moveTo(
            roundX + matchWidth + paddingX / 2,
            yPos1 + matchHeight / 2
          );
          path.lineTo(
            roundX + matchWidth + paddingX / 2,
            yPos2 + matchHeight / 2
          );

          // Garis horizontal menuju kotak pertandingan berikutnya
          path.moveTo(roundX + matchWidth + paddingX / 2, nextRoundY);
          path.lineTo(roundX + matchWidth + paddingX, nextRoundY);

          g.append("path")
            .attr("d", path)
            .attr("stroke", "#FFD700")
            .attr("stroke-width", 2)
            .attr("fill", "none");
        }

        // Gambar kotak pertandingan untuk pemain 1
        g.append("rect")
          .attr("x", roundX)
          .attr("y", yPos1)
          .attr("width", matchWidth)
          .attr("height", matchHeight)
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("class", "fill-gray-800 stroke-gray-700 stroke-1");

        g.append("text")
          .attr("x", roundX + 10)
          .attr("y", yPos1 + matchHeight / 2 + 5)
          .attr("class", "fill-gray-200 text-sm")
          .text(match[0].name);

        // Gambar kotak pertandingan untuk pemain 2
        g.append("rect")
          .attr("x", roundX)
          .attr("y", yPos2)
          .attr("width", matchWidth)
          .attr("height", matchHeight)
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("class", "fill-gray-800 stroke-gray-700 stroke-1");

        g.append("text")
          .attr("x", roundX + 10)
          .attr("y", yPos2 + matchHeight / 2 + 5)
          .attr("class", "fill-gray-200 text-sm")
          .text(match[1].name);
      });
      roundX += matchWidth + paddingX;
    });
  }, [rounds]);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-inter">
      {/* Header */}
      <header className="text-center py-8 md:py-12 bg-gray-800 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-md">
          Turnamen Billiard 128 Peserta
        </h1>
        <p className="text-xl md:text-2xl mt-2 text-green-500 font-semibold">
          Disponsori oleh:{" "}
          <span className="font-bold text-yellow-400">
            168 Billiard and Cafe
          </span>
        </p>
      </header>

      {/* Kontainer utama bagan */}
      <main className="p-4 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-yellow-400">
          Bagan Turnamen
        </h2>

        {/* Kontainer untuk tombol grup */}
        <div className="flex justify-center gap-4 mb-8">
          {["A", "B", "C", "D"].map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`py-2 px-6 rounded-lg font-bold transition-all duration-300
                ${
                  selectedGroup === group
                    ? "bg-yellow-400 text-gray-900 shadow-xl"
                    : "bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 text-gray-300"
                }`}
            >
              Group {group}
            </button>
          ))}
        </div>
        {/* Kontainer bagan dan kontrol zoom */}
        <div className="flex flex-col items-center">
          {/* Tombol Zoom */}
          <div className="flex gap-4 mb-4">
            <button
              className="bg-gray-700 text-white font-bold p-3 rounded-full hover:bg-gray-600 transition-colors"
              onClick={() =>
                d3
                  .select(svgRef.current)
                  .transition()
                  .duration(750)
                  .call(d3.zoom().scaleBy, 1.2)
              }
            >
              +
            </button>
            <button
              className="bg-gray-700 text-white font-bold p-3 rounded-full hover:bg-gray-600 transition-colors"
              onClick={() =>
                d3
                  .select(svgRef.current)
                  .transition()
                  .duration(750)
                  .call(d3.zoom().scaleBy, 0.8)
              }
            >
              -
            </button>
          </div>
          <div className="flex justify-center overflow-x-auto min-h-[600px] py-8">
            <div className="flex">
              <svg ref={svgRef} className="cursor-grab"></svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
