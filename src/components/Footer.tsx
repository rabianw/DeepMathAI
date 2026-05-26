import { Mail, MapPin, Globe } from "lucide-react";
import { getImageUrl } from "../lib/cloudinary";

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={getImageUrl("/images/deepmathai-brain-light.png")}
                alt="DeepMathAI"
                className="h-10 w-10"
              />
              <div>
                <span className="text-lg font-extrabold text-white">DeepMathAI</span>
                <p className="text-[10px] text-gray-500 tracking-wider uppercase">Research Group</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Interdisciplinary Research Group on Deep Mathematical Modeling
              for Machine Learning and Artificial Intelligence
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5 text-blue-400" />
                <span>
                  Department of Mathematics, Faculty of Science,
                  Naresuan University, Phitsanulok 65000, Thailand
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400" />
                <a href="mailto:rabianw@nu.ac.th" className="hover:text-blue-400 transition-colors">
                  rabianw@nu.ac.th
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-blue-400" />
                <span>Frontier Research & Innovation Cluster</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="/team" className="block hover:text-blue-400 transition-colors">Team & Network</a>
              <a href="/research" className="block hover:text-blue-400 transition-colors">Research Areas</a>
              <a href="/roadmap" className="block hover:text-blue-400 transition-colors">3-Year Roadmap</a>
              <a href="/activities" className="block hover:text-blue-400 transition-colors">Activities</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} DeepMathAI Research Group, Naresuan University. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Supported by Frontier Research and Innovation Clusters Program
          </p>
        </div>
      </div>
    </footer>
  );
}
